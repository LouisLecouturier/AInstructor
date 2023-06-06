from ninja import NinjaAPI, Schema, Form, File
from ninja.files import UploadedFile
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate
import jwt, datetime,uuid
from django.shortcuts import render
from app import models
from django.conf import settings
from .utils.chatbot import chat_bot_on_course
import openai


key = getattr(settings, "SECRET_KEY", None)
a_uuid = uuid.uuid4()
api = NinjaAPI()

class InvalidToken(Exception):
    pass

@api.exception_handler(InvalidToken)
def on_invalid_token(request, exc):
    return api.create_response(request, {"detail": "Invalid token supplied", "user message" :"your session has expired"}, status=401)

def get_this_user(username):
    """get the user from the username"""
    this_user= models.CustomUser.objects.get(username = username)
    return this_user

def get_this_token(token):
    """get the user from the token"""
    try: 
        this_token = models.CustomUser.objects.get(jwt_access = token) 
        return this_token
    except models.CustomUser.DoesNotExist:
        #raise InvalidToken("Token supplied is invalid")
        return models.CustomUser.objects.get(username = "default")
    except Exception as e:
        raise e
    
    
class GlobalAuth(HttpBearer):
    #gestion d'authentification générale basé sur bearer tokens
    def authenticate(self, request, token):  
              
        user = get_this_token(token)
 
        if user.jwt_access == token:
            return token, user.username

        
    
    def create_tokens(self, user_id: str) -> dict:
        access_token = jwt.encode({
            'user' : str(user_id), 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),   
        }, key, algorithm='HS256')
        refresh_token = jwt.encode({
            'user' : str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
        }, key, algorithm='HS256')

        return {"access token" :access_token, "refresh token" :refresh_token}
    
    


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


@api.post("/chatbot", auth=None)
def ask_chat_bot(request, course, question) : 
    return chat_bot_on_course(course, question)
    return True

@api.post("/upload", auth=None)
def upload_file(request, theme, file: UploadedFile = File(...)):
    file_data = file.read()
    name = file.name
    course = models.Course.objects.create(name=name, theme=theme)
    course.uploaded_file = file
    course.save()
    return {"message": "File uploaded successfully"}



@api.get("/getcourse", auth=None)
def get_course(request, course_id) : 
    cour = models.Course.objects.get(course_id = course_id)
    raw_text = cour.uploaded_file.read()
    return {"message": raw_text}


@api.post("/login", auth=None) 
def get_token(request, username: str = Form(...), password: str = Form(...)):
    user = get_this_user(username)
    #token = GlobalAuth().get_token(username)
    auth_perm = authenticate(request, username=username, password=password)
    print(auth_perm) 
    if auth_perm is not None:   
        tokens = GlobalAuth().create_tokens(user.id)
        user.jwt_access = tokens["access token"]
        user.jwt_refresh = tokens["refresh token"]
        user.save()
        return 200,{"message": "Authentification successfull","acces token": user.jwt_access, "refresh token" : user.jwt_refresh,"user": user.username,"user_id": user.id}

        """
        if user.jwt is None or user.jwt == 0 or user.jwt == "" or user.jwt == "null" or user.jwt == "None" or token == 0 or token == "" or token == "null" or token == "None": 
            user.jwt = GlobalAuth().create_tokens(user.id)
            user.save()
            return 200,{"message": "Authentification successfull", 
                        "token": user.jwt,
                        "user": user.username,
                        "user_id": user.id
                        }
    
        else :
            if GlobalAuth().require_new_token(token) == False:
                return 200,{"message": "Authentification successfull", 
                        "token": user.jwt,
                        "user": user.username,
                        "user_id": user.id
                        }
            elif GlobalAuth().require_new_token(token) == True:
                print(token)
                user.jwt = GlobalAuth().refresh_token(user.jwt)

                user.save()
                return 200,{"message": "Authentification successfull", 
                        "token": user.jwt,
                        "user": user.username,
                        "user_id": user.id
                        } 
            """
    else:
        return {"message": "Invalid credentials"}