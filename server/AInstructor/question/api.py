from ninja import NinjaAPI, Schema, Field, Router
import  datetime,uuid, os,json
from django.shortcuts import get_object_or_404
from app import models
from pydantic import BaseModel
from datetime import date
from typing import List


router = Router(tags=["Question"])

"""_______________________________________requests consergning the questions_________________________________________________________"""

class CreateQuestion(Schema):
    type_question: str = Field(...)
    statement: str = Field()
    questionnaire_id: uuid.UUID = Field(...)


@router.post("/question")
def create_question(request, question: CreateQuestion):
    """Create a new question"""
    questionnaire = get_object_or_404(models.Quesionnaire, questionnaire_id=question.questionnaire_id)
    new_question = models.Question.objects.create(
        type_question=question.type_question,
        statement=question.statement,
        questionnaire=questionnaire
    )
    return {"question_id": new_question.question_id}


class UpdateQuestion(Schema):
    question_id: uuid.UUID = Field(..., description="ID of the question to update")
    type_question: str = Field(..., description="Type of question: 'QO' for open-ended question or 'QCM' for multiple-choice question")
    statement: str = Field(..., description="Updated question statement")


@router.put("/question")
def update_question(request, question: UpdateQuestion):
    """Update an existing question"""
    existing_question = get_object_or_404(models.Question, question_id= question.question_id)
    existing_question.type_question = question.type_question
    existing_question.statement = question.statement
    existing_question.save()
    return {"question_id": existing_question.question_id}


class DeleteQuestion(Schema):
    question_id: uuid.UUID = Field(..., description="ID of the question to delete")

@router.delete("/question")
def delete_question(request, question: DeleteQuestion):
    """Delete a question"""
    models.Question.objects.filter(question_id=question.question_id).delete()
    return {"question_id": question.question_id}


@router.get("/questions/{questionnaire_id}")
def get_questions_by_questionnaire(request, questionnaire_id: uuid.UUID):
    """Get all questions belonging to a questionnaire"""
    questions = models.Question.objects.filter(questionnaire_id=questionnaire_id)
    question_list = []
    for question in questions:
        question_info = {
            "question_id": question.question_id,
            "type_question": question.type_question,
            "statement": question.statement,
            "questionnaire_id": question.questionnaire_id
        }
        question_list.append(question_info)
    return {"questions": question_list}

