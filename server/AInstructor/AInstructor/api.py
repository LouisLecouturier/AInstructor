from ninja import NinjaAPI, Schema, Form, Field
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate

import jwt, datetime,uuid, os,json
from django.db import models
from app import models
from django.conf import settings
from typing import List
from question.api import router as question_router
from course.api import router as cours_router
from questionary.api import router as questionary_router
from response.api import router as response_router
from group.api import router as group_router
from user.api import router as user_router

#from .utils.chatbot import chat_bot_on_course




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
        return None
    
    
class GlobalAuth(HttpBearer):
    #gestion d'authentification générale basé sur bearer tokens
    def authenticate(self, request, token):            
        try:
            user = get_this_token(token)
            if user.jwt_access == token:
                return token, user.username
        except AttributeError:
            return InvalidToken("Token supplied is invalid")
        except models.CustomUser.DoesNotExist:
            return InvalidToken("Token supplied is invalid")
        return InvalidToken("Token supplied is invalid")
    
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
    
#comment for debug without auth
api = NinjaAPI(auth=GlobalAuth())

api.add_router("/question", question_router)
api.add_router("/questionary", questionary_router)
api.add_router("/course", cours_router )
api.add_router("/response", response_router)
api.add_router("/group", group_router)
api.add_router("/user", user_router)




# @api.post("/chatbot", )
# def ask_chat_bot(request, course, question) : 
#     return chat_bot_on_course(course, question)



@api.post("/login",auth=None ) 
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
    else:
        return {"message": "Invalid credentials"}