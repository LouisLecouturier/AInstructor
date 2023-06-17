import datetime
import os
import tempfile
import uuid as uuidLib
from pathlib import Path

import pdfplumber
import pypandoc

import openai
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import models
from django.shortcuts import get_object_or_404
from ninja import Router, Schema, File, UploadedFile
from pydantic import Field
from django.http import HttpResponse, HttpResponseNotFound
from django.conf import settings

import json
from app import models

pypandoc.download_pandoc()
router = Router(tags=["Course"])

"""________________________________________request conserning the courses__________________________________________________"""


class UploadTheme(Schema):
    theme: str = Field(...)
    name: str
    color: str


@router.post("/{user_id}")
def create_course(request, user_id: int, file: UploadedFile = File(...)):
    user = get_object_or_404(models.CustomUser, id=user_id)

    # Vérifier l'extension du fichier
    file_extension = os.path.splitext(file.name)[1].lower()

    # chemin du fichier
    storage_path = Path(f"{user.id}/{file.name}")
    absolute_file_path = Path(settings.MEDIA_ROOT).joinpath(storage_path)
    # chemin avec l'extension changée en .md
    absolute_file_path_md = absolute_file_path.with_suffix('.md')
    absolute_file_path_txt = absolute_file_path.with_suffix('.txt')

    if (".pdf", ".docx", ".doc").count(file_extension) == 0:
        print('Unsupported file format.')
        return HttpResponse("Invalid file format", status=400)

    if file_extension == ".pdf":
        text_content = ""
        # Open the pdf file in read binary mode.
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text_content += page.extract_text()

        # Create a ContentFile object from the text
        txt_file = ContentFile(text_content)

        default_storage.save(storage_path.with_suffix('.txt'), txt_file)

        temp_file_path = tempfile.mktemp(suffix='.md')
        pypandoc.convert_text(text_content, 'md', format='plain', outputfile=temp_file_path, extra_args=['--preserve-tabs'])
        md_file = ContentFile(open(temp_file_path, 'rb').read())
        default_storage.save(storage_path.with_suffix('.md'), md_file)

    else:
        default_storage.save(storage_path, file)

        pypandoc.convert_file(absolute_file_path, 'md',
                              outputfile=absolute_file_path_md, extra_args=['--preserve-tabs'])
        pypandoc.convert_file(absolute_file_path, 'plain',
                              outputfile=absolute_file_path_txt, extra_args=['--preserve-tabs'])

    course = models.Course.objects.create(
        name=file.name,
        uploadedBy=user,
        filePath=absolute_file_path_md,
        textPath=absolute_file_path_txt,
    )

    quizz = models.Quizz.objects.create(
        owner=user
    )

    quizz.course.add(course)
    quizz.save()

    return {'uuid': course.uuid}


@router.get("/teachers/{user_id}")
def get_my_courses(request, user_id: int):
    user = get_object_or_404(models.CustomUser, id=user_id)

    # teams = user.team_set.all()
    # courses = models.Course.objects.filter(team__in=teams)

    courses = models.Course.objects.filter(uploadedBy=user)

    Quizz = models.Quizz.objects.filter(course__in=courses)

    result = []
    for course in courses:
        quizz = models.Quizz.objects.filter(course=course)
        print(course.team.all().first())

        if course.team.all().first() is not None:
            teamName = course.team.all().first().name
        else:
            teamName = None

        course_info = {
            'uuid': course.uuid,
            'name': course.name,
            'team': teamName,
            'description': course.description,
            'subject': course.subject,
            "status": "pending",
            "deliveryDate": course.deliveryDate,
            "creationDate": course.creationDate,
        }
        result.append(course_info)

    return result


@router.get("/students/{user_id}")
def get_my_courses(request, user_id: int):
    user = get_object_or_404(models.CustomUser, id=user_id)

    teams = user.team_set.all()
    courses = models.Course.objects.filter(team__in=teams)

    # courses = models.Course.objects.filter(uploadedBy=user)

    Quizz = models.Quizz.objects.filter(course__in=courses)

    result = []
    for course in courses:
        quizz = models.Quizz.objects.filter(course=course)
        print(course.team.all().first())

        if course.team.all().first() is not None:
            teamName = course.team.all().first().name
        else:
            teamName = None

        if quizz.exists():
            status = quizz.first().status
        else:
            status = None

        course_info = {
            'uuid': course.uuid,
            'name': course.name,
            'team': teamName,
            'description': course.description,
            'subject': course.subject,
            "status": status,
            "deliveryDate": course.deliveryDate,
            "creationDate": course.creationDate,
        }
        result.append(course_info)

    return result


# class teamsList(Schema):

@router.put("/{uuid}/updateTeams")
def update_teams(request, uuid: str):
    request = json.loads(request.body.decode('utf-8'))

    course = get_object_or_404(models.Course, uuid=uuid)
    course.team.clear()

    for teamUUID in request:
        team = get_object_or_404(models.Team, uuid=teamUUID)
        course.team.add(team)
        course.save()

    return {"error": False}


@router.get("/{uuid}/text")
def get_rawtext(request, uuid: uuidLib.UUID):
    course = get_object_or_404(models.Course, uuid=uuid)
    # with open(course.uploadedFile.path, 'r', encoding="utf-8", errors="ignore") as file:
    #     lines = file.readlines()
    #
    # # Récupérer le contenu restant
    # content = ''.join(lines)
    # text = cours.read()
    # # print(text)
    content = ""

    if default_storage.exists(course.filePath):
        with default_storage.open(course.filePath, 'rb') as file:
            content = file.read().decode('utf-8')
    else:
        return HttpResponseNotFound("File not found")

    return {
        "course": content,
        "name": course.name,
        "subject": course.subject,
        "teacher": course.uploadedBy.first_name + " " + course.uploadedBy.last_name,
        "text": content
    }


@router.get("/{uuid}/generate-questions", )
def generate_questions(request, uuid: str):
    """generate questions from the course"""
    course = get_object_or_404(models.Course, uuid=uuid)
    # Ouvrez le fichier en mode lecture

    content = ""
    if default_storage.exists(course.textPath):
        with default_storage.open(course.textPath, 'rb') as file:
            content = file.read().decode('utf-8')
    else:
        return HttpResponseNotFound("File not found")


    openai.api_key = "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"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "assistant", "content": content},
            {"role": "user",
             "content": "Ecrit moi 10 questions sur ce texte pour tester mes connaisances mais tu ecris seulement les questions et pas les réponses"},
        ]
    )

    questions_with_numbers = response.choices[0].message.content.split('\n')
    questions = [q.split('.', 1)[1].strip() for q in questions_with_numbers if q.strip()]

    return {"questions": questions}


@router.get("/byId/{uuid}", )
def get_courses_by_id(request, uuid: str):
    """get the course by id"""
    course = get_object_or_404(models.Course, uuid=uuid)

    teams = []
    for team in course.team.all():
        teamInfo = {
            'uuid': team.uuid,
            'name': team.name,
        }
        teams.append(teamInfo)

    return {
        'uuid': course.uuid,
        'name': course.name,
        'subject': course.subject,
        'description': course.description,
        'uploadedBy': course.uploadedBy.username,
        'file': os.path.basename(course.filePath),
        'teams': teams,
    }


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
    return {'uuid': course.uuid, 'name': course.name, 'teamName': team.name, 'teamUUID': team.uuid,
            'deadline': course.dateEnd}


# à mettre dans Team api
@router.get("/team/{uuid}")
def get_courses_by_team(request, uuid: uuidLib.UUID):
    """get all the courses of the team"""
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
            'file': os.path.basename(course.filePath),
            # 'text': course.text,
        }
        result.append(course_info)
    return result


class AssignCourse(Schema):
    course_id: uuidLib.UUID = Field(...)
    group_id: str = Field(...)
    deadline: datetime.date = Field(...)


@router.post("/assign-course")
def assign_course(request, body: AssignCourse):
    """assigne a course to a group"""
    course = get_object_or_404(models.Course, course_id=body.course_id)
    group = get_object_or_404(models.Groupe, group_id=body.group_id)
    course.group.add(group)
    course.date_end = body.deadline
    course.save()
    return {'course_id': course.course_id, 'course name': course.name, 'group name': group.name,
            'group_id': group.group_id, 'deadline': course.date_end}


@router.get("/courses/{group_id}")
def get_courses_by_group(request, group_id: uuidLib.UUID):
    """get all the courses of the user"""
    group = get_object_or_404(models.Groupe, group_id=group_id)
    courses = models.Course.objects.filter(group=group)

    result = []
    for course in courses:
        course_info = {
            'course_id': course.course_id,
            'name': course.name,
            'theme': course.theme,
            'uploaded_by': course.uploaded_by.username,
            'color': course.color,
            'file': os.path.basename(course.filePath),
            # 'text': course.text,
        }
        result.append(course_info)
    return result


class UpdateCourse(Schema):
    name: str = Field(...)
    subject: str = Field(...)
    # color: str = Field(...)
    description: str = Field(...)


@router.put("/put/{uuid}")
def update_meta_data_from_course(request, uuid, courseInfo: UpdateCourse):
    """update the course metadata : name, theme, color"""
    course = get_object_or_404(models.Course, uuid=uuid)
    print(courseInfo)

    course.subject = courseInfo.subject
    course.name = courseInfo.name
    course.description = courseInfo.description
    # course.color = courseInfo.color
    course.save()

    return {
        'uuid': course.uuid,
        'subject': course.subject,
        'name': course.name,
        'description': course.description,
        # 'color': course.color
    }


class UpdateCourseFile(Schema):
    uuid: uuidLib.UUID = Field(...)


@router.put("/update-course-file")
# TODO : modify the file
def update_course_file(request, body: UpdateCourseFile, file: UploadedFile = File(...)):
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
    # TODO : delete the file
    course = models.Course.objects.get(uuid=uuid)
    course.delete()
    return {'uuid': uuid}


class UpdateCourseText(Schema):
    uuid: uuidLib.UUID = Field(...)
    text: str = Field(...)


@router.put("/update-course-text")
def update_course_text(request, body: UpdateCourseText):
    """update the course text"""
    course = get_object_or_404(models.Course, uuid=body.uuid)
    course.text = body.text
    course.save()
    return {'uuid': course.uuid, 'text': course.text}
