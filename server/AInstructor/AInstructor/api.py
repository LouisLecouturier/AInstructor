from ninja import NinjaAPI, Schema, Form
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate
import jwt, datetime,uuid
from django.shortcuts import render
from app import models
from django.conf import settings

key = getattr(settings, "SECRET_KEY", None)
a_uuid = uuid.uuid4()
api = NinjaAPI()

class InvalidToken(Exception):
    pass

@api.exception_handler(InvalidToken)
def on_invalid_token(request, exc):
    return api.create_response(request, {"detail": "Invalid token supplied", "user message" :"your session has expired"}, status=401)

def get_this_user(username):
	this_user= models.CustomUser.objects.get(username = username)
	return this_user
def get_this_token(token):
    this_token = models.CustomUser.objects.get(jwt = token) 
    return this_token

class GlobalAuth(HttpBearer):
    #gestion d'authentification générale basé sur bearer tokens
    def authenticate(self, request, token):        
        user = get_this_token(token)
        require_new_token = GlobalAuth().require_new_token(user.jwt)
        if require_new_token == False:
            if user is not None:
                return token, user.username
            else:    
                raise InvalidToken()
        else :
            user.jwt = GlobalAuth().refresh_token(user.jwt)
            user.save()
            return token, user.username
        
    def create_tokens(self, user_id: str) -> dict:
        access_token = jwt.encode({
            'token' : str(user_id), 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7) 
        }, str(key).encode('utf-8'), algorithm='HS256')
        
        return access_token
    
    def refresh_token(self, token: str) -> dict:
        access_token = { 'token':str(a_uuid), 
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7) 
                        }
        return jwt.encode(access_token, str(key), algorithm='HS256')
    
    def require_new_token(self, token):
        if token is None or token == "" or token == "null" or token == 0:
            return True
        token = jwt.decode(token, str(key).encode('utf-8'), algorithms=['HS256'])
        expiration_timestamp = token.get('exp')
        if expiration_timestamp is None or datetime.datetime.fromtimestamp(expiration_timestamp)  < datetime.datetime.utcnow() - datetime.timedelta(days=2):
        
            return False
        else:
            return True
        
    

api = NinjaAPI(auth=GlobalAuth())

"""debut des definition de requêtes : """







@api .get("/hello")
def hello(request, username = "world"):
    return "Hello " + str(username)



#example d'une requete avec authentification avec un schema d'erreur)
class UserSchema(Schema):
    username: str
    email: str
    first_name: str
    last_name: str

class Error(Schema):
    message: str

@api.get("/me",response={200: UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Please sign in first"}
    return request.user








@api.post("/login", auth=None) 
def get_token(request, username: str = Form(...), password: str = Form(...)):
    user = get_this_user(username)
    auth_perm = authenticate(request, username=username, password=password)
    print(auth_perm) 
    if auth_perm is not None:
        if user.jwt is None or user.jwt == 0: 
            user.jwt = GlobalAuth().create_tokens(user.id)
            user.save()
        return 200,{"message": "Authentification successfull", 
                    "token": user.jwt,
                    "user": user.username,
                    "user_id": user.id
                    }
    else:
        return {"message": "Invalid credentials"}