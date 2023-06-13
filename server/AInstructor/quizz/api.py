from ninja import NinjaAPI, Schema,  Field, Router  
import uuid as uuidLib, os, json
from django.shortcuts import  get_object_or_404
from app import models
from pydantic import BaseModel
from datetime import date
from typing import List


router = Router(tags=["Quizz"])

"""_______________________________________requests consergning the quizz_________________________________________________________"""


class Quizz(Schema):
    title: str 
    description: str 
    courses: List[uuidLib.UUID] = Field(...)
    dateEnd: date 
    theme : str   
    teams: List[uuidLib.UUID] = Field(...)

@router.post("/questionnary/create", )
def create_questionnary(request, body : Quizz):
    """create a new questionnary"""
    today = date.today()

    tojen = request.headers.get('Authorization')
    accessToken = tojen.split(' ')[1]
    print(accessToken)
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    quizz = models.Quizz.objects.create(title=body.title, dateCreation = today ,description=body.description,  dateEnd=body.dateEnd, theme=body.theme)
    quizz.owner.set([user])
    try : 
        courses = models.Course.objects.filter(uuid__in=body.courses)
    except models.Course.DoesNotExist:
        return {'message': " some of the courses does not exist"}
    quizz.course.set(courses)    

    try :
        teams = models.Team.objects.filter(uuid__in=body.teams )
    except models.CustomUser.DoesNotExist:
        return {'message': " some of the users does not exist"}
    
    quizz.teams.set(teams)
    quizz.save()
    return {'message': "succesfully created the quizz : %s" %quizz.title , 'id' : quizz.uuid}



@router.get("/quizz/{uuid}")
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
                'type': question.type,
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


