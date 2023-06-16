from ninja import NinjaAPI, Schema, Field, UploadedFile, File
from ninja.security import HttpBearer
from django.contrib.auth import authenticate
import jwt, datetime, uuid as uuidLib
from django.db import models
from app import models
from django.conf import settings
from .utils import user_requirements
from question.api import router as question_router
from course.api import router as course_router
from quizz.api import router as quizz_router
from answer.api import router as answer_router
from user.api import router as user_router
from team.api import router as team_router
from django.shortcuts import get_object_or_404

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


def get_user_by_token(token):
    """get the user from the token"""
    try:
        this_token = models.CustomUser.objects.get(accessToken=token)
        return this_token
    except models.CustomUser.DoesNotExist:
        return None


class GlobalAuth(HttpBearer):
    # gestion d'authentification générale basé sur bearer tokens
    def authenticate(self, request, token):
        try:
            user = get_user_by_token(token)
            if user.jwt_access == token:
                return token, user.username
        except AttributeError:
            return InvalidToken("Token supplied is invalid")
        except models.CustomUser.DoesNotExist:
            return InvalidToken("Token supplied is invalid")
        return InvalidToken("Token supplied is invalid")

    def create_tokens(self, user_id: str) -> dict:
        accessToken = jwt.encode({
            'user': str(user_id),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
        }, key, algorithm='HS256')
        refreshToken = jwt.encode({
            'user': str(user_id) + str(a_uuid),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow(),
        }, key, algorithm='HS256')

        return {"accessToken": accessToken, "refreshToken": refreshToken}


# comment for debug without auth
api = NinjaAPI(auth=GlobalAuth())

api.add_router("/question", question_router)
api.add_router("/quizz", quizz_router)
api.add_router("/course", course_router)
api.add_router("/answer", answer_router)
api.add_router("/team", team_router)
api.add_router("/user", user_router)


# @api.post("/chatbot", )
# def ask_chat_bot(request, course, question) : 
#     return chat_bot_on_course(course, question)


class Login(Schema):
    email: str
    password: str


@api.post("/login", auth=None)
def get_token(request, body: Login):
    body = body.dict()
    print(body)
    user = get_object_or_404(models.CustomUser, email=body["email"])
    auth_perm = authenticate(request, username=body["email"], password=body["password"])
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
            "accessToken": user.accessToken,
            "refreshToken": user.refreshToken,
            "message": "Authentification successfull",
        }
  

class CreateUser(Schema):
    email: str = Field(...)
    password: str = Field(...)
    first_name: str
    last_name: str
    isTeacher: bool


@api.post('register', auth=None)
def register(request, body: CreateUser):
    print(body)
    username = body.email
    if not user_requirements.validate_mail(body.email):
        return {"error": True, "message": "Invalid email"}

    if not user_requirements.validate_password_strength(body.password):
        return {"error": True, "message": "Invalid password"}
    if not user_requirements.validate_username(username) and not user_requirements.validate_not_empty(username):
        return {'error': 'username is not valid or already used !'}

    user = models.CustomUser.objects.create_user(
        username=username,
        password=body.password,
        email=body.email,
        first_name=body.first_name,
        last_name=body.last_name,
        isTeacher=body.isTeacher,
        # profilePicture=file,
    )
    try:

        user.save()
        return {"error": False, "message": "User created"}
    except Exception as e:
        print(e)
        return {"error": True, "message": "User not created"}
