from ninja import NinjaAPI, Schema, Form
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate
import jwt, datetime,uuid
from django.shortcuts import render
from django.db import models
from app import models
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
import os,json 
from ninja import NinjaAPI, File
from ninja.files import UploadedFile
from pydantic import BaseModel
from fastapi import UploadFile
import pdfplumber
from django.core.files.uploadedfile import InMemoryUploadedFile
from app.models import Course


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

@api.post('/upload', auth=None)
def upload(request):
    file: InMemoryUploadedFile = request.FILES.get('file')
    
    # Convertir le fichier PDF en texte avec encodage UTF-8
    text_content = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text_content += page.extract_text()

    # Convertir le texte en encodage UTF-8
    text_content_utf8 = text_content.encode('utf-8')

    # Créer un fichier texte distinct encodé en UTF-8
    txt_file = ContentFile(text_content_utf8)
    file.name = file.name.replace('.pdf', '.md')

    # Enregistrer le fichier texte en tant qu'objet Course en base de données
    course = models.Course.objects.create()
    course.uploaded_file.save(file.name, txt_file)
    course.save()

    return {'name': file.name,'course_id': course.course_id}

@api.get("/course/{course_id}", auth=None)
def courses(request, course_id: str):
    cour = models.Course.objects.get(course_id=course_id)
    raw_text = cour.uploaded_file.read().decode('utf-8')
    cour.uploaded_file.name= cour.uploaded_file.name.replace('.pdf', '.md')
    return {'text':raw_text,'nom': cour.uploaded_file.name,'course_id': cour.course_id,'theme':cour.theme,'uploaded_by':cour.uploaded_by}

@api.get("/courses", auth=None)
def courses(request):
    cours = models.Course.objects.all()

    result = []
    for cour in cours:
        raw_text = cour.uploaded_file.read().decode('utf-8')
        cour.uploaded_file.name = cour.uploaded_file.name.replace('.pdf', '.md')
        course_info = {
            'text': raw_text,
            'nom': cour.uploaded_file.name,
            'course_id': cour.course_id,
            'theme': cour.theme,
            'uploaded_by': cour.uploaded_by
        }
        result.append(course_info)

    return result

@api.post("/course-file", auth=None)
def add_course(request,uploaded_file: UploadedFile = File(...)):
    uploaded_file = request.FILES.get('uploaded_file')

    if uploaded_file:
        file_content = uploaded_file.read()
        file_name = uploaded_file.name
        # Traitez les données du fichier et enregistrez-le dans la base de données
        course = Course()
        # Enregistrer le contenu du fichier dans le champ uploaded_file
        course.uploaded_file.save(uploaded_file.name, ContentFile(file_content))
        # Sauvegarder le modèle en base de données
        course.save()
        return {'name': file_name, 'len': len(file_content)}

    return {'message': 'No file uploaded'}


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

    
@api .get("/hello")
def hello(request, username = "world"):
    return "Hello " + str(username)



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
        if user.jwt is None or user.jwt == "0": 
            user.jwt = GlobalAuth().create_tokens(user.id)
            user.save()
        return 200,{"message": "Authentification successfull", 
                    "token": user.jwt,
                    "user": user.username,
                    "user_id": user.id
                    }
    else:
        return {"message": "Invalid credentials"}