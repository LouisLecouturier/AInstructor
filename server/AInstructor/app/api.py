# from ninja import NinjaAPI, Schema, Form, File, UploadedFile, Field
# from ninja.files import UploadedFile
# from ninja.security import django_auth, HttpBearer
# from django.contrib.auth import authenticate
# import jwt, datetime,uuid, os,json, openai, pdfplumber
# from django.shortcuts import render, get_object_or_404
# from django.db import models
# from app import models
# from django.conf import settings
# from django.core.files.uploadedfile import InMemoryUploadedFile
# from django.core.files.base import ContentFile
# from pydantic import BaseModel
# from fastapi import UploadFile
# from .utils import  user_requirements
# from datetime import date
# from typing import List
# #from .utils.chatbot import chat_bot_on_course



# key = getattr(settings, "SECRET_KEY", None)
# a_uuid = uuidLib.uuid4()
# api = NinjaAPI()

# class InvalidToken(Exception):
#     pass

# @api.exception_handler(InvalidToken)
# def on_invalid_token(request, exc):
#     return api.create_response(request, {"detail": "Invalid token supplied", "user message" :"your session has expired"}, status=401)

# def get_this_user(username):
#     """get the user from the username"""
#     this_user= models.CustomUser.objects.get(username = username)
#     return this_user

# def get_this_token(token):
#     """get the user from the token"""
#     try: 
#         this_token = models.CustomUser.objects.get(jwt_access = token) 
#         return this_token
#     except models.CustomUser.DoesNotExist:
#         #raise InvalidToken("Token supplied is invalid")
#         return models.CustomUser.objects.get(username = "default")
#     except Exception as e:
#         raise e
    
    
# class GlobalAuth(HttpBearer):
#     #gestion d'authentification générale basé sur bearer tokens
#     def authenticate(self, request, token):            
#         user = get_this_token(token)
#         if user.jwt_access == token:
#             return token, user.username

#     def create_tokens(self, user_id: str) -> dict:
#         access_token = jwt.encode({
#             'user' : str(user_id), 
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
#             'iat': datetime.datetime.utcnow(),   
#         }, key, algorithm='HS256')
#         refresh_token = jwt.encode({
#             'user' : str(user_id),
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
#             'iat': datetime.datetime.utcnow(),
#         }, key, algorithm='HS256')

#         return {"access token" :access_token, "refresh token" :refresh_token}

# api = NinjaAPI(auth=GlobalAuth())






# """   debut des definition de requêtes :    """


    
# @api .get("/hello")
# def hello(request, username = "world"):
#     """hello world test function"""
#     return "Hello " + str(username)




# """________________________________________request conserning the courses__________________________________________________"""
# class UploadTheme(Schema):
#     theme: str  = Field(...)
#     color: str = Field(...)

# @api.post('/uploadCourse')
# def upload(request,body : UploadTheme, file: UploadedFile,  ):
#     file: InMemoryUploadedFile = request.FILES.get('file')
#     text_content = ""
#     with pdfplumber.open(file) as pdf:
#         for page in pdf.pages:
#             text_content += page.extract_text()
#     # text_content_utf8 = text_content.encode('utf-8')
#     # txt_file = ContentFile(text_content_utf8)
#     file.name = file.name.replace('.pdf', '.md')

#     course = models.Course.objects.create( name = file.name, text = text_content,uploadedFile= file , theme = body.theme)
#     token = request.headers.get('Authorization')
#     token = token.split(' ')[1]
#     user = models.CustomUser.objects.get(jwt_access=token)
#     course.uploadedBy = user
#     course.save()
#     return {'name': file.name,'uuid': course.uuid, "uploadedBy": user.username}




# class GetCOurse(Schema):
#     uuid: uuidLib.UUID  = Field(...)
#     name : str = Field(...)
#     theme : str = Field(...)
#     text : str = Field(...)
#     uploadedBy : str = Field(...)
#     color : str = Field(...)

# @api.get("/course/{uuid}", response=GetCOurse, auth=None)
# def get_courses_by_id(request, uuid: uuidLib.UUID):
#     """get the course by id"""
#     course = get_object_or_404(models.Course, uuid=uuid)
#     return {
#         'uuid': course.uuid,'name': course.name,
#         'theme': course.theme,'text': course.text,
#         'uploadedBy': course.uploadedBy.username,'color': course.color
#         }





# @api.get("/mycourses", auth=None)
# def my_courses(request):
#     cours = models.Course.objects.all()
#     result = []
#     for cour in cours:
#         raw_text = cour.uploaded_file.read().decode('utf-8')
#         cour.uploaded_file.name = cour.uploaded_file.name.replace('.pdf', '.md')
#         course_info = {
#             'text': raw_text,
#             'nom': cour.uploaded_file.name,
#             'uuid': cour.uuid,
#             'theme': cour.theme,
#             'uploadedBy': cour.uploadedBy,
#             'color': cour.color
#         }
#         result.append(course_info)
#     return result


# class UpdateCourse(Schema):
#     uuid: str  = Field(...)
#     name: str = Field(...)
#     theme: str = Field(...)
#     color: str = Field(...)

# @api.put("/update-metadate-course")
# def update_meta_data_from_course(request,course : UpdateCourse):
#     """update the course metadata : name, theme, color"""
#     update_course = get_object_or_404(models.Course, uuid=course.uuid)
#     update_course.theme = course.theme
#     update_course.name = course.name
#     update_course.color = course.color
#     update_course.save()
#     return {'uuid': update_course.uuid, 'theme': update_course.theme, 'name': update_course.name, 'color': update_course.color}



# class UpdateCourseFile(Schema):
#     uuid: uuidLib.UUID = Field(...)


# @api.put("/update-course-file", auth=None)
# def update_course_file(request,body : UpdateCourseFile, file: UploadedFile = File(...)):
#     """update the course file"""
#     course = get_object_or_404(models.Course, uuid=body.uuid)
#     if file.name.endswith(('.pdf', '.md')):
#         course.uploadedFile= file
#         course.save()
#         return {'uuid': str(course.uuid)}
#     else:
#         return {'error': 'File is not a PDF or MD.'}


# @api.delete("/course/{uuid}")
# def delete_data(request, uuid: str):
#     course = models.Course.objects.get(uuid=uuid)
#     course.delete()
#     return {'uuid': uuid}


# class UpdateCourseText(Schema):
#     uuid: uuidLib.UUID = Field(...)
#     text: str = Field(...)

# @api.put("/update-course-text")
# def update_course_text(request,body : UpdateCourseText):
#     """update the course text"""
#     course = get_object_or_404(models.Course, uuid=body.uuid)
#     course.text = body.text
#     course.save()
#     return {'uuid': course.uuid, 'text': course.text}

# """__________________________________________________________request conserning the users_______________________________________________________"""



# @api.get("/users", auth=None)
# def list_users(request):
#     """get the list of all users -> debug only pcq pas safe"""
#     users = models.CustomUser.objects.all()
#     print(users)
#     user_list = []
#     for user in users:
#         user_info = {
#             'id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             'isTeacher': user.isTeacher,
#             'lastConnexion': user.lastConnexion,
#             'profilePicture' : str(user.profilePicture.url) if user.profilePicture else None,
#             'jwt': {'accessToken' :user.accessToken, 'refreshToken': user.refreshToken}
#         }
#         user_list.append(user_info)
#     return {'users': user_list}



# @api.get("/user", auth=None)
# def get_user_by_username(request, username: str):
#     user = get_object_or_404(models.CustomUser, username=username)
#     return {'id': user.id, 'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'isTeacher': user.isTeacher, 'lastConnexion': user.lastConnexion, 'profilePicture' : str(user.profilePicture.url) if user.profilePicture else None}

# @api.get("/users/{user_id}", auth=None)
# def get_users_by_id(request, user_id: int):
#     user = get_object_or_404(models.CustomUser, id = user_id)
#     return {'id': user.id, 'username': user.username, 'email': user.email, 'first_name': user.first_name, 'last_name': user.last_name, 'isTeacher': user.isTeacher, 'lastConnexion': user.lastConnexion, 'profilePicture' : str(user.profilePicture.url) if user.profilePicture else None}


# class CreateUser(Schema):
#     username: str = Field(...)
#     password: str = Field(...)
#     email: str = Field(...)
#     first_name: str = Field(...)
#     last_name: str = Field(...)
#     isTeacher: bool = Field(...)
    
# @api.post("/user/create", auth=None)
# def create_user(request,body : CreateUser, file: UploadedFile = File(...)):
#     """create a new user"""
#     if  not user_requirements.validate_email(body.email):
#         return {'error': 'mail is not valid or already used !'}
#     elif not user_requirements.validate_username(body.username):
#         return {'error': 'username is not valid or already used !'}
#     elif not user_requirements.validate_password_strength(body.password):
#         return {'error': 'password is not strong enougth! use at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'}
#     else:
#         user = models.CustomUser.objects.create_user(username=body.username, password=body.password, email=body.email, first_name=body.first_name, last_name=body.last_name, isTeacher=body.isTeacher, profilePicture=file)
#         return {'message': "succesfully created the user :" + user.username, 'id' : 'user.id'}

# class UpdateUser(Schema):
#     username: str = Field(...)
#     email: str = Field(...)
#     first_name: str = Field(...)
#     last_name: str = Field(...)
#     password: str = Field(...)

# @api.put("/Update/{user_id}", auth=None)
# def update_user(request, body : UpdateUser, user_id: int):
#     user = get_object_or_404(models.CustomUser, id=user_id)
   
#     if user_requirements.validate_username(body.username) == False:
#         return {'error': 'Username already exists'}
#     if  user_requirements.validate_password_strength(body.password) == False:
#         return {'error': 'password is not strong enough'}
#     if user_requirements.validate_not_empty(body.username) == False:
#         return {'error': 'username is too short'}
#     if user_requirements.validate_mail(body.email) and user_requirements.validate_not_empty(body.username) == False:
#         return {'error': 'email is not a valid format or already used'}
#     user.username = body.username
#     user.email = body.email
#     user.password = body.password
#     user.first_name = body.first_name
#     user.last_name = body.last_name
#     user.save()
#     return {'message': user.username +" updated"}



# @api.delete("/user/{user_id}", auth=None)
# def delete_user(request, user_id: int):
#     user = get_object_or_404(models.CustomUser, id=user_id)
#     user.delete()
#     return {'status': 'ok', 'message': 'user'+ user.username+'deleted'}


# """_______________________________________requests consergning the quizz_________________________________________________________"""


# class Questionnary(Schema):
#     title: str = Field(...)
#     description: str = Field(...)
#     uuid: int = Field(...)
#     dateEnd: date = Field(...)
#     dateCreation: date = Field(...)
#     theme : str = Field(...)
#     score : int = Field(...)
#     nbr_question_total : int = Field(...)
#     nbr_QCM : int = Field(...)
#     difficulty : str = Field(...)


# @api.post("/questionnary/create", auth=None)
# def create_questionnary(request, body : Questionnary):
#     """create a new questionnary"""
#     questionnary = models.Questionnary.objects.create(title=body.title, description=body.description, uuid=body.uuid, course=body.course, questions=body.questions, dateEnd=body.dateEnd, dateCreation=body.dateCreation, theme=body.theme, score=body.score, nbr_question_total=body.nbr_question_total, nbr_QCM=body.nbr_QCM, difficulty=body.difficulty, editable_by=body.editable_by, team=body.team)
#     questionnary.save()
#     return {'message': "succesfully created the questionnary :" + questionnary.title, 'id' : 'questionnary.id'}




# @api.get("/quizz/{uuid}", auth=None)
# def get_course_info(request, uuid: uuidLib.UUID):
#     quizz = get_object_or_404(models.Quizz, uuid=uuid)
#     course = quizz.course.first()
#     questions = models.Question.objects.filter(quizz=quizz)
#     editable_users = quizz.editable_by.all()
#     return {
#         'uuid': quizz.uuid,
#         'course': {
#             'uuid': course.uuid,
#             'name': course.name,
#         },
#         'questions': [ 
#                 {
#                     'uuid': question.uuid,
#                     'statement': question.statement,
#                     'type': question.type,                
#                 }
#                 for question in questions
#         ],
#         'editable_by': [
#                 {
#                     'user_id': user.user_id,
#                     'username': user.username,
#                 }    
#             for user in editable_users
#         ]
#     }












# """_______________________________________requests consergning the questions_________________________________________________________"""

# class CreateQuestion(Schema):
#     questionType: str = Field(...)
#     statement: str = Field()
#     uuid: uuidLib.UUID = Field(...)

# @api.post("/question", auth=None)
# def create_question(request, question: CreateQuestion):
#     """Create a new question"""
#     quizz = get_object_or_404(models.Quizz, uuid=question.uuid)
#     new_question = models.Question.objects.create(
#         questionType=question.questionType,
#         statement=question.statement,
#         quizz=quizz
#     )
#     return {"uuid": new_question.uuid}


# class UpdateQuestion(Schema):
#     uuid: uuidLib.UUID = Field(..., description="ID of the question to update")
#     questionType: str = Field(..., description="Type of question: 'QO' for open-ended question or 'QCM' for multiple-choice question")
#     statement: str = Field(..., description="Updated question statement")

# @api.put("/question", auth=None)
# def update_question(request, question: UpdateQuestion):
#     """Update an existing question"""
#     existing_question = get_object_or_404(models.Question, uuid= question.uuid)
#     existing_question.questionType = question.questionType
#     existing_question.statement = question.statement
#     existing_question.save()
#     return {"uuid": existing_question.uuid}


# class DeleteQuestion(Schema):
#     uuid: uuidLib.UUID = Field(..., description="ID of the question to delete")

# @api.delete("/question", auth=None)
# def delete_question(request, question: DeleteQuestion):
#     """Delete a question"""
#     models.Question.objects.filter(uuid=question.uuid).delete()
#     return {"uuid": question.uuid}


# @api.get("/questions/{uuid}", auth=None)
# def get_questions_by_quizz(request, uuid: uuidLib.UUID):
#     """Get all questions belonging to a quizz"""
#     questions = models.Question.objects.filter(uuid=uuid)
#     question_list = []
#     for question in questions:
#         question_info = {
#             "uuid": question.uuid,
#             "questionType": question.questionType,
#             "statement": question.statement,
#             "uuid": question.uuid
#         }
#         question_list.append(question_info)
#     return {"questions": question_list}



# # @api.post("/chatbot", auth=None)
# # def ask_chat_bot(request, course, question) : 
# #     return chat_bot_on_course(course, question)




# @api.post("/login", auth=None) 
# def get_token(request, username: str = Form(...), password: str = Form(...)):
#     user = get_this_user(username)
#     #token = GlobalAuth().get_token(username)
#     auth_perm = authenticate(request, username=username, password=password)
#     print(auth_perm) 
#     if auth_perm is not None:   
#         tokens = GlobalAuth().create_tokens(user.id)
#         user.accessToken = tokens["accessToken"]
#         user.refreshToken = tokens["refreshToken"]
#         user.save()
#         return 200, {"message": "Authentification successfull","accesToken": user.accessToken, "refreshToken" : user.refreshToken,"user": user.username,"user_id": user.id}
#     else:
#         return {"message": "Invalid credentials"}