from ninja import Schema, Field, Router
import uuid as uuidLib
from django.shortcuts import get_object_or_404
from ..app import models

router = Router(tags=["Question"])

"""_______________________________________requests consergning the questions_________________________________________________________"""


class CreateQuestion(Schema):
    QuizzUUID: uuidLib.UUID = Field(...)
    questionType: str = Field(...)
    statement: str = Field()


@router.post("/question", )
def create_question(request, question: CreateQuestion):
    """Create a new question"""

    quizz = models.Quizz.objects.get(uuid=question.QuizzUUID)  # recuperer le quizz uuid
    #     course = quizz.course.first() #recuperer le cours du quizz
    #     path = course.textPath#recuperer le chemin du fichier texte du cours
    #     # Ouvrez le fichier en mode lecture
    #     with open(path, "r",encoding="utf-8") as fichier:
    #     # Lisez le contenu du fichier
    #         texte = fichier.read()
    #     openai.api_key = "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"

    #     response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content": "You are a helpful assistant."},
    #         {"role": "assistant", "content": texte},
    #         {"role": "user", "content": "Ecrit moi 10 questions sur ce texte pour tester mes connaisances mais tu ecris seulement les questions et pas les réponses"},
    #     ]
    # )

    #     print(response.choices[0].message.content)

    #     print("done")

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
