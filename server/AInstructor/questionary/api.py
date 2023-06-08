from ninja import NinjaAPI, Schema,  Field, Router  
import uuid, os,json
from django.shortcuts import  get_object_or_404
from app import models
from pydantic import BaseModel
from datetime import date
from typing import List


router = Router(tags=["Questionary"])

"""_______________________________________requests consergning the questionnaire_________________________________________________________"""


class Questionnary(Schema):
    title: str 
    description: str 
    course_id:List[uuid.UUID] = Field(...)
    date_end: date 
    theme : str  
    score : int  
    nbr_question_total : int
    nbr_QCM : int  
    difficulty : str 


@router.post("/questionnary/create", )
def create_questionnary(request, body : Questionnary):
    """create a new questionnary"""
    today = date.today()
    questionnary = models.Quesionnaire.objects.create(title=body.title, date_creation = today ,description=body.description,  date_end=body.date_end, theme=body.theme, score=body.score, nbr_question_total=body.nbr_question_total, nbr_QCM=body.nbr_QCM, difficulty=body.difficulty)
    courses = models.Course.objects.filter(course_id__in=body.course_id)
    questionnary.course.set(courses)    
    # questions = models.Question.objects.filter(question_id__in=body.questions)
    # questionnary.questions.set(questions)
    editable_by = models.CustomUser.objects.filter(editable_by=body.editable_by)
    questionnary.editable_by.set(editable_by)
    sign_in = models.CustomUser.objects.filter(user_id__in=body.sign_in)
    questionnary.sign_in.set(sign_in)
    questionnary.save()
    return {'message': "succesfully created the questionnary :" + questionnary.title, 'id' : 'questionnary.id'}




@router.get("/questionnaire/{questionnaire_id}", )
def get_questionary_info(request, questionnaire_id: uuid.UUID):
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



