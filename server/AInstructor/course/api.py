from ninja import Router, Schema, File, UploadedFile, Field
from app import models
import datetime,uuid as uuidLib,pdfplumber
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from app import models
from django.conf import settings
from typing import List
from course.user_requirements import validate_password_strength, validate_username, validate_mail, validate_not_empty
from django.core.files.base import ContentFile
from pydantic import BaseModel, Field






router = Router(tags=["Course"])


"""________________________________________request conserning the courses__________________________________________________"""
class UploadTheme(Schema):
    theme: str  = Field(...)
    color: str = Field(...)

@router.post('/uploadCourse',)
def upload(request,body : UploadTheme, file: UploadedFile,  ):
    #file: InMemoryUploadedFile = request.FILES.get('file')
    text_content = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text_content += page.extract_text()

    text_content_utf8 = text_content.encode('utf-8')
    txt_file = ContentFile(text_content)

    file.name = file.name.replace('.pdf', '.md')

    course = models.Course.objects.create( name = file.name, text = text_content,uploadedFile = file , theme = body.theme)

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=token)

    course.uploadedBy = user
    course.save()
    return {'name': file.name,'uuid': course.uuid, "uploadedBy": user.username}



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
        'file': course.uploaded_file.name,
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


class AssignCourse(Schema):
    uuid: uuidLib.UUID = Field(...)
    teamUUID: uuidLib.UUID = Field(...)
    deadline: datetime.date = Field(...)

@router.post("/assign-course")
def assign_course(request, body: AssignCourse):
    """assigne a course to a team"""
    course = get_object_or_404(models.Course, uuid=body.uuid)
    team = get_object_or_404(models.Team, uuid=body.teamUUID)
    course.team.add(team)
    course.dateEnd = body.deadline
    course.save()
    return {'uuid': course.uuid, 'name' : course.name, 'teamName' : team.name, 'teamUUID': team.uuid, 'deadline': course.dateEnd}

#à mettre dans Team api
@router.get("/{uuid}")
def get_courses_by_team(request, uuid: uuidLib.UUID):
    """get all the courses of the user"""
    team = get_object_or_404(models.Team, uuid=uuid)
    courses = models.Course.objects.filter(team=team)

    result = []
    for course in courses:
        course_info = {
            'uuid': course.uuid,
            'name': course.name,
            'theme': course.theme,
            'uploadedBy': course.uploadedBy.username,
            'color': course.color,
            'file': course.uploaded_file.name,
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
    uuid: uuidLib.UUID  = Field(...)

@router.put("/update-course-file")
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
    course = models.Course.objects.get(uuid=uuid)
    course.delete()
    return {'uuid': uuid}


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

