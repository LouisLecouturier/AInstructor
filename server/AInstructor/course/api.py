from ninja import Router, Schema, File, UploadedFile, Field
from app import models
import datetime,uuid as uuidLib,pdfplumber, aspose.words as pdf2md, os
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from app import models
from django.conf import settings
from typing import List
from course.user_requirements import validate_password_strength, validate_username, validate_mail, validate_not_empty
from django.core.files.base import ContentFile
from pydantic import BaseModel, Field
from django.core.files.storage import default_storage
from docx import Document
import openai



router = Router(tags=["Course"])


"""________________________________________request conserning the courses__________________________________________________"""
class UploadTheme(Schema):
    theme: str 
    name : str
    color : str
@router.post('/uploadCourse')
def upload(request, body: UploadTheme, file: UploadedFile = File(...)):
    # Vérifier l'extension du fichier
    file_extension = os.path.splitext(file.name)[1].lower()

@router.post('/uploadCourse',)
def upload(request,body : UploadTheme, file: UploadedFile = File(...) ):
    text_content = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text_content += page.extract_text()

    # text_content_utf8 = text_content.encode('utf-8')
    # txt_file = ContentFile(text_content)
    if body.name is None:
        name = file.name

    course = models.Course.objects.create( name = name ,text = text_content,  theme = body.theme, uploadedFile = file)

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=token)

    course.uploadedBy = user
    course.save()
    # file.name = file.name.replace('.pdf', '.md')

    # doc = pdf2md.Document(course.uploadedFile.path)
    # doc.save(course.uploadedFile.path.replace('.pdf', '.md'))

    # with open(course.uploadedFile.path, 'r',encoding='utf-8', errors='ignore') as f:
    #     try :
    #         text = f.read()
    #     except UnicodeDecodeError:
    #         text = ""

    # course.text = text
    # course.save()

    return {'name': file.name,'uuid': course.uuid, "uploadedBy": user.username}


@router.get("/course/{uuid}/generate-questions",  )
def generate_questions(request, uuid: str):
    """generate questions from the course"""
    course = get_object_or_404(models.Course, uuid=uuid)
    path = course.textPath
        #Ouvrez le fichier en mode lecture
    with open(path, "r",encoding="utf-8") as fichier:
    # Lisez le contenu du fichier
        texte = fichier.read()
    openai.api_key = "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"

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "assistant", "content": texte},
        {"role": "user", "content": "Ecrit moi 10 questions sur ce texte pour tester mes connaisances mais tu ecris seulement les questions et pas les réponses"},
    ]
)

    questions_with_numbers = response.choices[0].message.content.split('\n')
    questions = [q.split('.', 1)[1].strip() for q in questions_with_numbers if q.strip()]

    return {"questions": questions} 
    

@router.get("/{uuid}",  )
def get_courses_by_id(request, uuid: str):
    """get the course by id"""
    course = get_object_or_404(models.Course, uuid=uuid)
    return {
        'uuid': course.uuid,
        'name': course.name,
        'theme': course.theme,
        'text': course.text,
        'uploadedBy': course.uploadedBy.username,
        'color': course.color,
        'file': course.uploadedFile.name,
        }


@router.get("/mycourses")
def get_my_courses(request):
    """get all the courses of the user"""
    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    
    try:
        user = models.CustomUser.objects.get(accessToken=token)
    except ObjectDoesNotExist:
        return {"error": "User not found"} 

    teams = user.team_set.all()
    courses = models.Course.objects.filter(group__in=teams)

    result = []
    for course in courses:
        course_info = {
            'uuid': course.uuid,
            'name': course.name,
            'theme': course.theme,
            'uploadedBy': course.uploadedBy.username,
            'color': course.color,
            'file': course.uploadedFile.name,
            #'text': course.text,
        }
        result.append(course_info)
    return result


class UpdateCourse(Schema):
    uuid: uuidLib.UUID  = Field(...)
    name: str = Field(...)
    theme: str = Field(...)
    color: str = Field(...)

@router.put("/update-metadate-course")
def update_meta_data_from_course(request,course : UpdateCourse):
    """update the course metadata : name, theme, color"""
    update_course = get_object_or_404(models.Course, uuid=course.uuid)
    update_course.theme = course.theme
    update_course.name = course.name
    update_course.color = course.color
    update_course.save()
    return {'uuid': update_course.uuid, 'theme': update_course.theme, 'name': update_course.name, 'color': update_course.color}



class UpdateCourseFile(Schema):
    uuid: uuidLib.UUID = Field(...)

@router.put("/updateCourseFile")
def update_course_file(request,body: UpdateCourseFile,file: UploadedFile = File(...)):
    """update the course file"""
    course = get_object_or_404(models.Course, uuid=body.uuid)
    if file.name.endswith(('.pdf', '.md')):
        course.uploadedFile = file
        course.save()
        return {'uuid': str(course.uuid)}
    else:
        return {'error': 'File is not a PDF or MD.'}


@router.delete("/course/{uuid}")
def delete_data(request, uuid: str):
    course  = get_object_or_404(models.Course, uuid=uuid)
    course.delete()
    return {'uuid': uuid}



class UpdateCourse(Schema):
    uuid: uuidLib.UUID  = Field(...)
    name: str
    theme: str 
    color: str 

@router.put("/update/metadata")
def update_meta_data_from_course(request,body : UpdateCourse):
    course = get_object_or_404(models.Course, uuid=body.uuid)
    course.theme = body.theme
    course.name = body.name
    course.color = body.color
    course.save()
    return {'uuid': course.uuid, 'theme': course.theme, 'name': course.name, 'color': course.color}




class UpdateCourseText(Schema):
    uuid: uuidLib.UUID = Field(...)
    text: str = Field(...)

@router.put("/update-course-text")
def update_course_text(request,body : UpdateCourseText):
    """update the course text"""
    course = get_object_or_404(models.Course, uuid=body.uuid)
    course.text = body.text
    course.save()
    return {'uuid': course.uuid, 'text': course.text}

