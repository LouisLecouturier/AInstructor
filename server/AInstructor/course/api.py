from ninja import Router, Schema, File, UploadedFile, Field
from app import models
import datetime,uuid,pdfplumber
from ninja.files import UploadedFile
from django.shortcuts import get_object_or_404
from django.db import models
from app import models
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from typing import List
from course.user_requirements import validate_password_strength, validate_username, validate_mail, validate_not_empty

router = Router()



"""________________________________________request conserning the courses__________________________________________________"""
class UploadTheme(Schema):
    theme: str  = Field(...)
    color: str = Field(...)

@router.post('/uploadCourse',)
def upload(request,body : UploadTheme, file: UploadedFile,  ):
    file: InMemoryUploadedFile = request.FILES.get('file')
    text_content = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text_content += page.extract_text()
    # text_content_utf8 = text_content.encode('utf-8')
    # txt_file = ContentFile(text_content_utf8)
    file.name = file.name.replace('.pdf', '.md')

    course = models.Course.objects.create( name = file.name, text = text_content,uploaded_file = file , theme = body.theme)
    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = models.CustomUser.objects.get(jwt_access=token)
    course.uploaded_by = user
    course.save()
    return {'name': file.name,'course_id': course.course_id, "uploaded_by": user.username}




class GetCOurse(Schema):
    course_id: uuid.UUID  = Field(...)
    name : str = Field(...)
    theme : str = Field(...)
    text : str = Field(...)
    uploaded_by : str = Field(...)
    color : str = Field(...)

@router.get("/course/{course_id}", response=GetCOurse, )
def get_courses_by_id(request, course_id: uuid.UUID):
    """get the course by id"""
    course = get_object_or_404(models.Course, course_id=course_id)
    return {
        'course_id': course.course_id,'name': course.name,
        'theme': course.theme,'text': course.text,
        'uploaded_by': course.uploaded_by.username,'color': course.color
        }





@router.get("/mycourses", )
def my_courses(request):
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
            'uploaded_by': cour.uploaded_by,
            'color': cour.color
        }
        result.append(course_info)
    return result


class UpdateCourse(Schema):
    course_id: str  = Field(...)
    name: str = Field(...)
    theme: str = Field(...)
    color: str = Field(...)

@router.put("/update-metadate-course")
def update_meta_data_from_course(request,course : UpdateCourse):
    """update the course metadata : name, theme, color"""
    update_course = get_object_or_404(models.Course, course_id=course.course_id)
    update_course.theme = course.theme
    update_course.name = course.name
    update_course.color = course.color
    update_course.save()
    return {'course_id': update_course.course_id, 'theme': update_course.theme, 'name': update_course.name, 'color': update_course.color}



class UpdateCourseFile(Schema):
    course_id: uuid.UUID = Field(...)


@router.put("/update-course-file", )
def update_course_file(request,body : UpdateCourseFile, file: UploadedFile = File(...)):
    """update the course file"""
    course = get_object_or_404(models.Course, course_id=body.course_id)
    if file.name.endswith(('.pdf', '.md')):
        course.uploaded_file = file
        course.save()
        return {'course_id': str(course.course_id)}
    else:
        return {'error': 'File is not a PDF or MD.'}


@router.delete("/course/{course_id}")
def delete_data(request, course_id: str):
    course = models.Course.objects.get(course_id=course_id)
    course.delete()
    return {'course_id': course_id}


class UpdateCourseText(Schema):
    course_id: uuid.UUID = Field(...)
    text: str = Field(...)

@router.put("/update-course-text")
def update_course_text(request,body : UpdateCourseText):
    """update the course text"""
    course = get_object_or_404(models.Course, course_id=body.course_id)
    course.text = body.text
    course.save()
    return {'course_id': course.course_id, 'text': course.text}