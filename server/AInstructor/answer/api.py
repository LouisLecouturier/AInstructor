from ninja import Schema, Router
from django.shortcuts import get_object_or_404
from app import models
import uuid as uuidLib
from typing import List
from pydantic import Field
import openai
from django.core.files.storage import default_storage
from django.http import HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist

router = Router(tags=["answer"])


class Answer(Schema):
    question_uuid: uuidLib.UUID = Field(...)
    answer: str = Field(...)


# utliser answer-quizz pour repondre a toutes les questions d'un quizz
@router.post("/create")
def answer_a_question(request, body: Answer):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    question = get_object_or_404(models.Question, uuid=body.question_uuid)

    if user and question:
        answer = models.Answer.objects.create(user=user)
        answer.question = question
        answer.givenAnswer = body.answer
        answer.save()
        return {'message': "successfully created the answer", "uuid": answer.uuid, "question": question.uuid,
                "user": user.id}
    else:
        return {'message': "user or question does not exist"}


class AnswerList(Schema):
    quizz: uuidLib.UUID = Field(...)
    answer: List[Answer]


@router.post("/answer-quizz")
def answer_all_questions(request, body: AnswerList):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    try:
        teams = user.team_set.all()
    except ObjectDoesNotExist:
        return {'message': "user is not in a team"}
    quizz = get_object_or_404(models.Quizz, uuid=body.quizz)
    questions = quizz.question_set.all()

    results = []  # Liste pour stocker les résultats de chaque question

    if user and quizz:
        for question in questions:
            # Récupérer la réponse
            answer = models.Answer.objects.get(user=user, question=question)

            if question:
                course = get_object_or_404(models.Course, uuid=quizz.course.first().uuid)

                content = ""
                if default_storage.exists(course.textPath):
                    with default_storage.open(course.textPath, 'rb') as file:
                        content = file.read().decode('utf-8')
                else:
                    return HttpResponseNotFound("File not found")

                # Définir votre clé API OpenAI
                openai.api_key = "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"

                # Utiliser OpenAI ChatCompletion pour obtenir une réponse corrigée pour chaque question-réponse
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system",
                         "content": "You are a helpful assistant. You have the text: " + content + ". You have a question: " + question.statement + ". You have an answer: " + answer.givenAnswer + "."},
                        {"role": "user",
                         "content": "Is this answer correct? " + answer.givenAnswer + ". Answer yes or no. Answer in french and justify."},
                    ]
                )

                reponse = response.choices[0].message.content
                reponse_avant_virgule = reponse.split(',')[0]
                reponse_apres_virgule = reponse.split(',')[1]
                answer.aiCorrection = reponse_apres_virgule

                if reponse_avant_virgule == "Oui":
                    answer.isCorrect = True
                else:
                    answer.isCorrect = False
                answer.save()

                # Ajouter les informations de la question à la liste des résultats
                results.append({
                    "questionUuid": question.uuid,
                    "studentUuid": user.id,
                    "studentAnswer": answer.givenAnswer,
                    "isCorrect": answer.isCorrect,
                    "aiCorrection": answer.aiCorrection
                })

        return {'message': "user has already answered the quizz", "results": results}


@router.get("{quiz_uuid}/answers")
def get_answers_to_one_quiz_for_one_user(request, quiz_uuid: uuidLib.UUID):
    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)
    quiz = get_object_or_404(models.Quizz, uuid=quiz_uuid)
    dict = {}
    if user and quiz:
        answers = models.Answer.objects.filter(user=user)
    else:
        return {'message': "user or quiz does not exist"}
    answer_dict = {}
    for answer in answers:
        associatedQuestion = get_object_or_404(models.Question, uuid=answer.question.uuid)
    if associatedQuestion:
        answer_dict[str(answer.uuid)] = str(associatedQuestion.uuid)
    return {'message': "successfully got the answers", "format": "answer_uuid : question_uuid",
            "answers": answer_dict, }


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
        return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid,
                "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection, "user": answer.user.uuid}
    else:
        return {'message': "user or question does not exist"}


@router.get("/{uuid_answer}/answer")
def get_answer_to_one_question_by_id(request, uuid_answer: uuidLib.UUID):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid,
            "question_uuid": answer.question.uuid, "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection,
            "user": answer.user.uuid}


class newAnswer(Schema):
    answer: str = Field(...)


@router.put("/{uuid_answer}/update")
def update_answer(request, uuid_answer: uuidLib.UUID, new_answer: newAnswer):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    answer.givenAnswer = new_answer.answer
    answer.save()
    return {"message": "successfully updated the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid,
            "question_uuid": answer.question.uuid}


@router.delete("/{uuid_answer}/delete")
def delete_answer(request, uuid_answer: uuidLib.UUID):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    answer.delete()
    return {"message": "successfully deleted the answer", "answer_uuid": uuid_answer}

# #debug purpose : delete all answers
# @router.delete("/delete/all")
# def delete_all_answers(request):
#     models.Answer.objects.all().delete()
#     models.UserQuizzResult.objects.all().delete()
#     return {"message": "successfully deleted all answers"}
