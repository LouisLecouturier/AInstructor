from ninja import Schema, Field, Router
import uuid as uuidLib, json
from django.shortcuts import get_object_or_404
from app import models
from datetime import date
from typing import List

router = Router(tags=["Quizz"])

"""_______________________________________requests consergning the quizz_________________________________________________________"""


class Quizz(Schema):
    title: str
    description: str
    courses: List[uuidLib.UUID] = Field(...)
    dateEnd: date
    theme: str
    teams: List[uuidLib.UUID] = Field(...)


@router.post("/create", )
def create_quizz(request, body: Quizz):
    """create a new questionnary"""
    today = date.today()
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    quizz = models.Quizz.objects.create(title=body.title, dateCreation=today, description=body.description,
                                        dateEnd=body.dateEnd, theme=body.theme, owner=user)
    quizz.owner.set([user])
    try:
        courses = models.Course.objects.filter(uuid__in=body.courses)
    except models.Course.DoesNotExist:
        return {'message': " some of the courses does not exist"}
    quizz.course.set(courses)

    # try:
    #     teams = models.Team.objects.filter(uuid__in=body.teams)
    # except models.CustomUser.DoesNotExist:
    #     return {'message': " some of the users does not exist"}

    # quizz.teams.set(teams)
    quizz.save()
    return {'message': "succesfully created the quizz : %s" % quizz.title, 'uuid': quizz.uuid}


@router.get("/{uuid}")
def get_questionary_info(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    course = quizz.course.first()
    questions = models.Question.objects.filter(quizz=quizz)
    owners = quizz.owner.all()

    return {
        'uuid': quizz.uuid,
        'course': {
            'uuid': course.uuid,
            'name': course.name,
        },
        'questions': [
            {
                'uuid': question.uuid,
                'statement': question.statement,
                'type': question.questionType,
            }
            for question in questions
        ],
        'editable_by': [
            {
                'user_id': owner.id,
                'username': owner.username,
            }
            for owner in owners
        ]
    }


@router.get("by-course/{uuid}/questions")
def get_quizz_by_course(request, uuid: uuidLib.UUID):
    """Get quizz by course"""
    course = get_object_or_404(models.Course, uuid=uuid)
    quizz = models.Quizz.objects.get(course=course)

    try:
        questions = models.Question.objects.filter(quizz__in=[quizz.uuid])

        if questions.count() == 0:
            return {"uuid": quizz.uuid, "questions": []}
    except models.Question.DoesNotExist:
        return

    question_list = []
    for question in questions:
        question_list.append({
            "question_uuid": question.uuid,
            "questionType": question.questionType,
            "statement": question.statement,
        })
    return {"uuid": quizz.uuid, "questions": question_list}


@router.get("/{uuid}/questions")
def get_questions_by_quizz(request, uuid: uuidLib.UUID):
    """Get all questions belonging to a quizz"""
    try:
        questions = models.Question.objects.filter(quizz__in=[uuid])
    except models.Question.DoesNotExist:
        return {'message': "the quizz does not exist"}

    question_list = []
    for question in questions:
        question_list.append({
            "question uuid": question.uuid,
            "questionType": question.questionType,
            "statement": question.statement,
        })
    return question_list


@router.get("/{uuid}/teams")
def get_teams_by_quizz(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    teams = quizz.teams.all()
    team_list = []
    for team in teams:
        team_list.append({
            "uuid": team.uuid,
            "name": team.name,
        })
    return team_list


@router.get("/{uuid}/courses")
def get_courses_by_quizz(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    courses = quizz.course.all()
    course_list = []
    for course in courses:
        course_list.append({
            "uuid": course.uuid,
            "name": course.name,
        })
    return course_list


class Question(Schema):
    add_team_uuid: List[uuidLib.UUID] = Field(...)
    rm_team_uuid: List[uuidLib.UUID] = Field(...)


@router.post("/{uuid}/assign-teams")
def assign_quizz_to_teams(request, body: Question, uuid: uuidLib.UUID):
    """assign a quizz to a team or remove the quizz from team"""
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    try:
        add_teams = models.Team.objects.filter(uuid__in=body.add_team_uuid)
    except models.Team.DoesNotExist:
        return {'message': "one of the added teams does not exist"}
    try:
        rm_teams = models.Team.objects.filter(uuid__in=body.rm_team_uuid)
    except models.Team.DoesNotExist:
        return {'message': "one of the removed teams does not exist"}
    quizz.teams.set(add_teams, clear=False)
    quizz.teams.remove(*rm_teams)
    quizz.save()
    return {'message': "succesfully assigned the course to the teams"}


class QuizzUpdate(Schema):
    title: str
    description: str
    dateEnd: date
    theme: str


@router.post("/{uuid}/update-info")
def update_quizz(request, body: QuizzUpdate, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    quizz.title = body.title
    quizz.description = body.description
    quizz.dateEnd = body.dateEnd
    quizz.theme = body.theme
    quizz.save()
    return {'message': "succesfully updated the quizz", 'id': quizz.uuid}


@router.delete("/{uuid}/delete")
def delete_quizz(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    quizz.delete()
    return {'message': "succesfully deleted the quizz", 'id': quizz.uuid}


class DeleteQuizz(Schema):
    uuid: list[uuidLib.UUID] = Field(...)


@router.delete("/delete")
def delete_quizz_list(request, list: DeleteQuizz):
    for uuid in list.uuid:
        quizz = get_object_or_404(models.Quizz, uuid=uuid)
        quizz.delete()
    return {'message': "succesfully deleted the quizz", 'id': quizz.uuid}


@router.put("/questions/{uuid}")
def update_quizz(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    questions = models.Question.objects.filter(quizz=quizz)

    # TODO : Secure so only quizz owner can update its quizz

    # Supprimer toutes les questions existantes du quizz
    questions.delete()

    # Parsing du data
    data_unicode = request.body.decode('utf-8')
    data = json.loads(data_unicode)

    # Loop through questions
    for question in data["questions"]:
        # print(question)
        # For each question given, create entity in DB
        q = models.Question.objects.create(uuid=uuidLib.uuid4(), statement=question, quizz=quizz)
        q.save()

    return {"message": "Questions saved succesfully"}
    # return {'message': "Successfully updated the quizz: %s" % quizz.title, 'id': quizz.uuid}
