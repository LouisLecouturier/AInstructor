from ninja import Router, Schema, File, UploadedFile, Field
from ninja.files import UploadedFile
import uuid, os,json
from django.shortcuts import get_object_or_404
from app import models
from pydantic import BaseModel
from datetime import date
from typing import List
from user import user_requirements

router = Router()

"""__________________________________________________________request conserning the users_______________________________________________________"""



@router.get("/users", )
def list_users(request):
    """get the list of all users -> debug only pcq pas safe"""
    users = models.CustomUser.objects.all()
    print(users)
    user_list = []
    for user in users:
        user_info = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_teacher': user.is_teacher,
            'last_connexion': user.last_connexion,
            'profile picture' : str(user.profil_picture.url) if user.profil_picture else None,
            'jwt': {'acces tokenn' :user.jwt_access, 'refresh token': user.jwt_refresh}
        }
        user_list.append(user_info)
    return {'users': user_list}



@router.get("/user", )
def get_user_by_username(request, username: str):
    user = get_object_or_404(models.CustomUser, username=username)
    return {'id': user.id, 'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'is_teacher': user.is_teacher, 'last_connexion': user.last_connexion, 'profile picture' : str(user.profil_picture.url) if user.profil_picture else None}

@router.get("/users/{user_id}", )
def get_users_by_id(request, user_id: int):
    user = get_object_or_404(models.CustomUser, id = user_id)
    return {'id': user.id, 'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'is_teacher': user.is_teacher, 'last_connexion': user.last_connexion, 'profile picture' : str(user.profil_picture.url) if user.profil_picture else None}


class CreateUser(Schema):
    username: str = Field(...)
    password: str = Field(...)
    email: str = Field(...)
    first_name: str = Field(...)
    last_name: str = Field(...)
    is_teacher: bool = Field(...)
    
@router.post("/user/create", )
def create_user(request,body : CreateUser, file: UploadedFile = File(...)):
    """create a new user"""
    if  not user_requirements.validate_mail(body.email):
        return {'error': 'mail is not valid or already used !'}
    elif not user_requirements.validate_username(body.username):
        return {'error': 'username is not valid or already used !'}
    # elif not user_requirements.validate_password_strength(body.password):
    #     return {'error': 'password is not strong enougth! use at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'}
    else:
        user = models.CustomUser.objects.create_user(username=body.username, password=body.password, email=body.email, first_name=body.first_name, last_name=body.last_name, is_teacher=body.is_teacher, profil_picture=file)
        return {'message': "succesfully created the user :" + user.username, 'id' : 'user.id'}

class UpdateUser(Schema):
    username: str = Field(...)
    email: str = Field(...)
    first_name: str = Field(...)
    last_name: str = Field(...)
    password: str = Field(...)

@router.put("/Update/{user_id}", )
def update_user(request, body : UpdateUser, user_id: int):
    user = get_object_or_404(models.CustomUser, id=user_id)
   
    if user_requirements.validate_username(body.username) == False:
        return {'error': 'Username already exists'}
    if user_requirements.validate_password_strength(body.password) == False:
        return {'error': 'password is not strong enough'}
    if user_requirements.validate_not_empty(body.username) == False:
        return {'error': 'username is too short'}
    if user_requirements.validate_mail(body.email) and user_requirements.validate_not_empty(body.username) == False:
        return {'error': 'email is not a valid format or already used'}
    user.username = body.username
    user.email = body.email
    user.password = body.password
    user.first_name = body.first_name
    user.last_name = body.last_name
    user.save()
    return {'message': user.username +" updated"}



@router.delete("/user/{user_id}", )
def delete_user(request, user_id: int):
    user = get_object_or_404(models.CustomUser, id=user_id)
    user.delete()
    return {'status': 'ok', 'message': 'user'+ user.username+'deleted'}
