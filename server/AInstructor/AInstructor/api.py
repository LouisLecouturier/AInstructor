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
import json
from app.models import CustomUser

from Teams.api import router as teams_router
from authentification.api import router as auth_router
from Cours.api import router as cours_router



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
api.add_router("/teams/", teams_router)
api.add_router("/auth/", auth_router)
api.add_router("/cours/", cours_router)





"""debut des definition de requêtes : """



@api.post("/chatbot", auth=None)
def ask_chat_bot(request, course, question) : 
    return chat_bot_on_course(course, question)






@api.post("/login", auth=None) 
def get_token(request):
    request = json.loads(request.body.decode('utf-8'))

    user = CustomUser.objects.get(email = request['email'])

    auth_perm = authenticate(request, username=user.username, password=request['password']) #authenticate the user

    print(auth_perm) 

    if auth_perm is not None:   # if the user is authenticated
        tokens = GlobalAuth().create_tokens(user.id) # create the tokens

        user.jwt_access = tokens["access token"]
        user.jwt_refresh = tokens["refresh token"] 
        user.save()

        return 200, {
            "message": "Authentification successfull",
            "acces token": user.jwt_access, 
            "refresh token" : user.jwt_refresh,
            "user": user.username,
            "user_id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "is_teacher": user.is_teacher,
        }

    else:
        return {"message": "Invalid credentials"}