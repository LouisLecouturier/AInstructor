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
    
#comment for debug without auth
api = NinjaAPI(auth=GlobalAuth())

api.add_router("/question", question_router)
api.add_router("/questionary", questionary_router)
api.add_router("/course", cours_router)
api.add_router("/response", response_router)
api.add_router("/group", group_router)
api.add_router("/user", user_router)


#il faudra rajouter uploaded_by dans le post
@api.post("/course-data", auth=None)
def add_data(request, course_id: str, theme: str):
    course = models.Course.objects.get(course_id=course_id)
    course.theme = theme
    course.save()
    return {'course_id': course_id, 'theme': theme}

@api.put("/course/{course_id}", auth=None)
def update_data(request, course_id: str, theme: str):
    course = models.Course.objects.get(course_id=course_id)
    course.theme = theme
    course.save()
    return {'course_id': course_id, 'theme': theme}

@api.delete("/course/{course_id}", auth=None)
def delete_data(request, course_id: str):
    course = models.Course.objects.get(course_id=course_id)
    course.delete()
    return {'course_id': course_id}


"""   debut des definition de requêtes :    """



@api.get("/users", auth=None)
def list_users(request, username: str = None):
    #users = list(models.CustomUser.objects.all().values_list('username', flat=True))
    users = list(models.CustomUser.objects.all().values('id', 'username', 'email', 'first_name', 'last_name','is_teacher','last_connexion','jwt'))
    return {'users': users}


@api.get("/user", auth=None)
def get_user(request, username: str):
    user = models.CustomUser.objects.filter(username=username).values('id', 'username', 'email', 'first_name', 'last_name', 'is_teacher', 'last_connexion', 'jwt').first()
    return {'user': user}


@api.get("/users/{user_id}", auth=None)
def get_user(request, user_id: int):
    try:
        user = models.CustomUser.objects.filter(id=user_id).values('id', 'username', 'email', 'first_name', 'last_name', 'is_teacher', 'last_connexion', 'jwt').first()
        if user:
            return {'user': user}
        else:
            return api.create_response(request, {"detail": "User not found"}, status=404)
    except Exception as e:
        return api.create_response(request, {"detail": str(e)}, status=500)



@api.post("/user/create", auth=None)
def create_user(request, username: str = Form(...), password: str = Form(...), email: str = Form(...), first_name: str = Form(...), last_name: str = Form(...)):
    user = models.CustomUser.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    return {'name': user.username}

@api.put("/user/{user_id}", auth=None)
def update_user(request, user_id: int, username: str = Form(...), password: str = Form(...), email: str = Form(...), first_name: str = Form(...), last_name: str = Form(...)):
    user = models.CustomUser.objects.get(id=user_id)
    user.username = username
    user.password = password
    user.email = email
    user.first_name = first_name
    user.last_name = last_name
    user.save()
    return {'name': user.username}
@api.delete("/user/{user_id}", auth=None)
def delete_user(request, user_id: int):
    user = models.CustomUser.objects.get(id=user_id)
    user.delete()
    return {'status': 'ok'}


# @api.post("/chatbot", )
# def ask_chat_bot(request, course, question) : 
#     return chat_bot_on_course(course, question)



@api.post("/login", auth=None ) 
def get_token(request):
    request = json.loads(request.body.decode('utf-8'))

    user = models.CustomUser.objects.get(email=request["username"])
    username = user.username


    auth_perm = authenticate(request, username=username, password=request["password"])
    print(auth_perm) 

   
    if auth_perm is not None:   
        tokens = GlobalAuth().create_tokens(user.id)
        user.jwt_access = tokens["access token"]
        user.jwt_refresh = tokens["refresh token"]
        user.save()
        return 200,{
            "message": "Authentification successfull",
            "acces token": user.jwt_access,
            "refresh token" : user.jwt_refresh,
            "user": user.username,
            "user_id": user.id,
            "is_teacher": user.is_teacher,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            }
    else:
        return {"message": "Invalid credentials"}


@api.post('register', auth=None)
def register(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)

    try:
        username = request['first_name'] + request['last_name']
        user = models.CustomUser.objects.create_user(username=username, password=request['password'], email=request['email'], first_name=request['first_name'], last_name=request['last_name'], is_teacher=request['is_teacher'])
        user.save()
    except :
        print("error")


    return {"error" : False, "message" : "User created"}