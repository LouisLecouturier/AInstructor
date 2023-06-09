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
    uuid: List[uuidLib.UUID] = Field(...)
    dateEnd: date 
    theme : str  
    score : int  
    nbr_question_total : int
    nbr_QCM : int  
    difficulty : str 


@router.post("/questionnary/create", )
def create_questionnary(request, body : Quizz):
    """create a new questionnary"""
    today = date.today()
    questionnary = models.Quizz.objects.create(title=body.title, dateCreation = today ,description=body.description,  dateEnd=body.dateEnd, theme=body.theme, score=body.score, nbr_question_total=body.nbr_question_total, nbr_QCM=body.nbr_QCM, difficulty=body.difficulty)
    courses = models.Course.objects.filter(uuid__in=body.uuid)
    questionnary.course.set(courses)    
    # questions = models.Question.objects.filter(question_id__in=body.questions)
    # questionnary.questions.set(questions)
    editable_by = models.CustomUser.objects.filter(editable_by=body.editable_by)
    questionnary.editable_by.set(editable_by)
    team = models.CustomUser.objects.filter(user_id__in=body.team)
    questionnary.team.set(team)
    questionnary.save()
    return {'message': "succesfully created the questionnary :" + questionnary.title, 'id' : 'questionnary.id'}




@router.get("/quizz/{uuid}", )
def get_questionary_info(request, uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=uuid)
    course = quizz.course.first()
    questions = models.Question.objects.filter(quizz=quizz)
    editable_users = quizz.editable_by.all()
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
                    'user_id': user.user_id,
                    'username': user.username,
                }    
            for user in editable_users
        ]
    }



