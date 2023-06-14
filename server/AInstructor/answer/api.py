from ninja import Schema, Router
from django.shortcuts import get_object_or_404
from app import models
import uuid as uuidLib
from typing import List
from pydantic import Field


router = Router(tags=["answer"])



class Answer(Schema):
    question_uuid: uuidLib.UUID = Field(...)
    answer: str = Field(...)


@router.post("/create")
def answer_a_question(request, body: Answer):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    question = get_object_or_404(models.Question, uuid=body.question_uuid)
    
    if user and question:
        answer = models.Answer.objects.create(user=user)
        answer.question = question
        answer.save()
        answer.givenAnswer = body.answer
        return {'message': "successfully created the answer", "uuid": answer.uuid, "question": question.uuid, "user": user.id}
    else:
        return {'message': "user or question does not exist"}





class AnswerList(Schema):
    quizz : uuidLib.UUID = Field(...)
    answer: List[Answer]


@router.post("/answer-quizz")
def answer_all_questions(request, body: AnswerList):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    quizz = get_object_or_404(models.Quizz, uuid=body.quizz)
    if user and quizz:
        for user_answer in body.answer:
            question = get_object_or_404(models.Question, uuid=user_answer.question_uuid)
            if question:
                answer = models.Answer.objects.create(user=user)
                answer.question = question
                answer.givenAnswer = user_answer.answer
                answer.save()
            else:
                return {'message': " one of the question does not exist"}
        return {'message': "successfully created the answer", "uuid": answer.uuid, "question": question.uuid, "user": user.id}
    else:
        return {'message': "user or quizz does not exist"}




@router.get("{quiz_uuid}/answers")
def get_answers_to_one_quiz_for_one_user(request, quiz_uuid: uuidLib.UUID):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    quiz = get_object_or_404(models.Quizz, uuid=quiz_uuid)
    dict = {}
    if user and quiz:
        answers = models.Answer.objects.filter(user=user)
    else : 
        return {'message': "user or quiz does not exist"}
    answer_dict = {}
    for answer in answers:
       associatedQuestion = get_object_or_404(models.Question, uuid=answer.question.uuid)
       if associatedQuestion:
            answer_dict[str(answer.uuid)] = str(associatedQuestion.uuid)
    return {'message': "successfully got the answers", "format" : "answer_uuid : question_uuid","answers": answer_dict}



@router.get("{quiz_uuid}/answers/all")
def get_answers_to_one_quiz_for_all_users(request, quiz_uuid: uuidLib.UUID):
    quizz = get_object_or_404(models.Quizz, uuid=quiz_uuid)
    teams = quizz.teams.all()   
    list = []
    for team in teams:
        users = team.users.all()
        for user in users:
            list.append(user.uuid)
            answers = models.Answer.objects.filter(user=user)
            answer_dict = {}
            for answer in answers:
                answer_dict[str(answer.uuid)] = str(answer.question.uuid)
            list.append(answer_dict)
    return {'message': "successfully got the answers", "answers": list}
    


@router.get("/{question_uuid}/answer")
def get_answer_to_one_question(request, question_uuid: uuidLib.UUID):
    question = get_object_or_404(models.Question, uuid=question_uuid)
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    if question and user:
        answer = get_object_or_404(models.Answer, question=question, user=user)
        return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection, "user" : answer.user.uuid }                          
    else:
        return {'message': "user or question does not exist"}
    
@router.get("/{uuid_answer}/answer")
def get_answer_to_one_question_by_id(request, uuid_answer: uuidLib.UUID):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "question_uuid": answer.question.uuid, "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection, "user" : answer.user.uuid}
    
