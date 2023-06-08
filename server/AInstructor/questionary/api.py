from ninja import NinjaAPI, Schema,  Field, Router  
import uuid, os,json
from django.shortcuts import  get_object_or_404
from app import models
from pydantic import BaseModel
from datetime import date
from typing import List


router = Router()

"""_______________________________________requests consergning the questionnaire_________________________________________________________"""


class Questionnary(Schema):
    title: str = Field(...)
    description: str = Field(...)
    course_id: int = Field(...)
    date_end: date = Field(...)
    date_creation: date = Field(...)
    theme : str = Field(...)
    score : int = Field(...)
    nbr_question_total : int = Field(...)
    nbr_QCM : int = Field(...)
    difficulty : str = Field(...)


@router.post("/questionnary/create", )
def create_questionnary(request, body : Questionnary):
    """create a new questionnary"""
    questionnary = models.Questionnary.objects.create(title=body.title, description=body.description, course_id=body.course_id, course=body.course, questions=body.questions, date_end=body.date_end, date_creation=body.date_creation, theme=body.theme, score=body.score, nbr_question_total=body.nbr_question_total, nbr_QCM=body.nbr_QCM, difficulty=body.difficulty, editable_by=body.editable_by, sign_in=body.sign_in)
    questionnary.save()
    return {'message': "succesfully created the questionnary :" + questionnary.title, 'id' : 'questionnary.id'}




@router.get("/questionnaire/{questionnaire_id}", )
def get_course_info(request, questionnaire_id: uuid.UUID):
    questionnaire = get_object_or_404(models.Quesionnaire, questionnaire_id=questionnaire_id)
    course = questionnaire.course.first()
    questions = models.Question.objects.filter(questionnaire=questionnaire)
    editable_users = questionnaire.editable_by.all()
    return {
        'questionnaire_id': questionnaire.questionnaire_id,
        'course': {
            'course_id': course.course_id,
            'name': course.name,
        },
        'questions': [ 
                {
                    'question_id': question.question_id,
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



