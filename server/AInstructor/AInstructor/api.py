from ninja import NinjaAPI, Schema, Form, Field
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate

import jwt, datetime, uuid as uuidLib, os, json
from django.db import models
from app import models
from django.conf import settings
from typing import List
from question.api import router as question_router
from course.api import router as cours_router
from quizz.api import router as quizz_router
from answer.api import router as answer_router
from user.api import router as user_router
from team.api import router as team_router

# from .utils.chatbot import chat_bot_on_course


key = getattr(settings, "SECRET_KEY", None)
a_uuid = uuidLib.uuid4()
api = NinjaAPI()


class InvalidToken(Exception):
    pass


@api.exception_handler(InvalidToken)
def on_invalid_token(request, exc):
    return api.create_response(request,
        {"detail": "Invalid token supplied", "user message": "your session has expired"},
        status=401)


def get_this_user(username):
    """get the user from the username"""
    this_user = models.CustomUser.objects.get(username=username)
    return this_user


def get_this_token(token):
    """get the user from the token"""
    try:
        this_token = models.CustomUser.objects.get(accessToken=token)
        return this_token
    except models.CustomUser.DoesNotExist:
        # raise InvalidToken("Token supplied is invalid")
        return models.CustomUser.objects.get(username="default")
    except Exception as e:
        raise e


class GlobalAuth(HttpBearer):
    # gestion d'authentification générale basé sur bearer tokens
    def authenticate(self, request, token):
        user = get_this_token(token)
        if user.accessToken == token:
            return token, user.username

    def create_tokens(self, user_id: str) -> dict:
        accessToken = jwt.encode({
            'user': str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
        }, key, algorithm='HS256')
        refreshToken = jwt.encode({
            'user': str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
        }, key, algorithm='HS256')

        return {"accessToken": accessToken, "refreshToken": refreshToken}


# comment for debug without auth
api = NinjaAPI(auth=GlobalAuth())

api.add_router("/question", question_router)
api.add_router("/quizz", quizz_router)
api.add_router("/course", cours_router)
api.add_router("/answer", answer_router)
api.add_router("/team", team_router)
api.add_router("/user", user_router)



# @api.post("/chatbot", )
# def ask_chat_bot(request, course, question) : 
#     return chat_bot_on_course(course, question)


@api.post("/login", auth=None)
def get_token(request):
    request = json.loads(request.body.decode('utf-8'))

    user = models.CustomUser.objects.get(email=request["username"])
    username = user.username

    auth_perm = authenticate(request, username=username, password=request["password"])
    print(auth_perm)

    if auth_perm is not None:
        tokens = GlobalAuth().create_tokens(user.id)
        user.accessToken = tokens["accessToken"]
        user.refreshToken = tokens["refreshToken"]
        user.save()
        return 200, {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "isTeacher": user.isTeacher,
            "accesToken": user.accessToken,
            "refreshToken": user.refreshToken,
            "message": "Authentification successfull",
        }
    else:
        return {"message": "Invalid credentials"}


@api.post('register', auth=None)
def register(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)

    try:
        username = request['first_name'] + request['last_name']
        user = models.CustomUser.objects.create_user(
            username=username, 
            password=request['password'],
            email=request['email'], 
            first_name=request['first_name'],
            last_name=request['last_name'], 
            isTeacher=request['isTeacher']
        )
        user.save()
    except:
        print("error")

    return {"error": False, "message": "User created"}
