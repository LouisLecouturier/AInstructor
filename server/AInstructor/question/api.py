import random

from ninja import Schema, Field, Router
import uuid as uuidLib
from django.shortcuts import get_object_or_404
from app import models
from django.db.models import Count 

import random

router = Router(tags=["Question"])

"""_______________________________________requests consergning the questions_________________________________________________________"""
NUMBER_OF_QUESTIONS = 5


def get_random_elements(lst):
    if len(lst) <= 5:
        return lst
    else:
        return random.sample(lst, 5)


class CreateQuestion(Schema):
    QuizzUUID: uuidLib.UUID = Field(...)
    questionType: str = Field(...)
    statement: str = Field()


@router.post("/question", )
def create_question(request, question: CreateQuestion):
    """Create a new question"""

    quizz = models.Quizz.objects.get(uuid=question.QuizzUUID)  # recuperer le quizz uuid

    new_question = models.Question.objects.create(
        questionType=question.questionType,
        statement=question.statement,
        quizz=quizz,
    )
    return {"uuid": new_question.uuid}


class UpdateQuestion(Schema):
    uuid: uuidLib.UUID = Field(..., description="ID of the question to update")
    questionType: str = Field(...,
                              description="Type of question: 'QO' for open-ended question or 'QCM' for multiple-choice question")
    statement: str = Field(..., description="Updated question statement")


@router.put("/question", )
def update_question(request, question: UpdateQuestion):
    """Update an existing question"""
    existing_question = get_object_or_404(models.Question, uuid=question.uuid)
    existing_question.questionType = question.questionType
    existing_question.statement = question.statement
    existing_question.save()
    return {"uuid": existing_question.uuid}


class DeleteQuestion(Schema):
    uuid: uuidLib.UUID = Field(..., description="ID of the question to delete")


@router.delete("/question", )
def delete_question(request, question: DeleteQuestion):
    """Delete a question"""
    models.Question.objects.filter(uuid=question.uuid).delete()
    return {"uuid": question.uuid}


@router.get("/training/{uuid}", )
def get_training_questions_batch_by_quizz(request, uuid: uuidLib.UUID):
    """Get all questions belonging to a quizz"""
    
    quizz = get_object_or_404(models.Quizz, uuid = uuid)

    token = request.headers.get('Authorization')
    accessToken = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=accessToken)



    questions = models.Question.objects.filter(quizz=uuid)
    question_list = []

    indexes = []

    falseResponses = models.Answer.objects.filter(user=user, question__in=questions, isCorrect=False).values('question')
    
    answeredQuestions = models.Answer.objects.filter(user=user, question__in=questions).values('question')

    answered_questions = [answer['question'] for answer in answeredQuestions]
    unanswered_questions = questions.exclude(uuid__in=answered_questions)

    unanswered_question_uuids = [question.uuid for question in unanswered_questions]
    false_question_uuids = [response['question'] for response in falseResponses]

    listeQuestion = unanswered_question_uuids + false_question_uuids
    # print(listeQuestion)

    random_elements = get_random_elements(listeQuestion)



    question_objects = []
    for question_uuid in random_elements:
        try:
            question_object = models.Question.objects.get(uuid=question_uuid)
            question_objects.append(question_object)
        except:
            pass

    

    returnValues = []
    for objet in question_objects:
        question_info = {
            "uuid": objet.uuid,
            "quizzUuid": objet.quizz.uuid,
            "questionType": objet.questionType,
            "statement": objet.statement,
        }
        returnValues.append(question_info)
        




    if len(returnValues) < NUMBER_OF_QUESTIONS:
        nbMissingQuestions = NUMBER_OF_QUESTIONS - len(returnValues)
        print(nbMissingQuestions)

        for i in range(nbMissingQuestions):
            index = random.randrange(0, len(questions), 1)

            while index in indexes:
                index = random.randrange(0, len(questions), 1)
                
            indexes.append(index)
            question = questions[index]
            question_info = {
            "uuid": question.uuid,
            "quizzUuid": question.quizz.uuid,
            "questionType": question.questionType,
            "statement": question.statement,
        }
            print(question.uuid)
            returnValues.append(question_info)

    print(returnValues)

    return returnValues
        
         

    # for i in range(NUMBER_OF_QUESTIONS):

    #     index = random.randrange(0, len(questions), 1)
    #     while index in indexes:
    #         index = random.randrange(0, len(questions), 1)
    #     indexes.append(index)
    #     question = questions[index]
    #     question_info = {
    #         "uuid": question.uuid,
    #         "quizzUuid": question.quizz.uuid,
    #         "questionType": question.questionType,
    #         "statement": question.statement,
    #     }
    #     question_list.append(question_info)



@router.get("/questions/{uuid}", )
def get_questions_by_quizz(request, uuid: uuidLib.UUID):
    """Get all questions belonging to a quizz"""
    questions = models.Question.objects.filter(uuid=uuid)
    question_list = []
    for question in questions:
        question_info = {
            "uuid": question.uuid,
            "quizzUuid": question.quizz,
            "questionType": question.questionType,
            "statement": question.statement,
        }
        question_list.append(question_info)
    return {"questions": question_list}
