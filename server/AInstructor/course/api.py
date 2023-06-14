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
from AInstructor.settings import CORS_ALLOWED_METHODS


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

    if file_extension == '.pdf':
        # Convertir le fichier PDF en texte
        text_content = ""
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text_content += page.extract_text()

    elif file_extension == '.docx':
        # Convertir le fichier Word en texte
        document = Document(file)
        paragraphs = document.paragraphs
        text_content = "\n".join([p.text for p in paragraphs])

    else:
        # Gérer d'autres extensions de fichiers ou afficher une erreur
        return {'error': 'Unsupported file format.'}

    # Enregistrer le contenu texte dans un fichier .txt
    txt_file_name = file.name.replace(file_extension, '.txt')
    txt_file_path = f"courses-for-IA/{txt_file_name}"  # Spécifiez le chemin de stockage souhaité
    
    # Convertir le texte en encodage UTF-8
    text_content_utf8 = text_content.encode('utf-8')
    
    txt_file = ContentFile(text_content_utf8)
    default_storage.save(txt_file_path, txt_file)

    # Sauvegarder le fichier .md
    course = models.Course.objects.create(name=file.name, theme=body.theme, uploadedFile=file, color=body.color, textPath=txt_file_path)

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=token)

    course.uploadedBy = user

    # Enregistrer le fichier .md en utilisant pdf2md.Document
    doc = pdf2md.Document(course.uploadedFile.path)
    doc.save(course.uploadedFile.path)

    return {'name': file.name, 'uuid': course.uuid, 'uploadedBy': user.username}

class AssignCourse(Schema):
    #assigne courses to a team
    course_id: List[uuidLib.UUID] = Field(...)
    team_id: uuidLib.UUID = Field(...)
    deadline: datetime.date 

@router.post("/assignCourse")
def assign_course(request , body: AssignCourse):
    """assigne  courses to a team"""
    try:
        courses = models.Course.objects.filter(uuid__in=body.course_id)
    except ObjectDoesNotExist:
        return {"message":"some of the courses are not found"}
    team = get_object_or_404(models.Team, uuid=body.team_id)

    for course in courses:
        course.team.add(team)

        if body.deadline is None:
            course.date_end = datetime.date.today() + datetime.timedelta(years=1)
        else : 
            course.date_end = body.deadline

        course.save()
    return {'message': 'courses assigned successfully'}
   
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

