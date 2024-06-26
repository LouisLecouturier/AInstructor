
from ninja import Schema, Router
from django.shortcuts import get_object_or_404
from app import models
import uuid as uuidLib
from typing import List
from pydantic import Field
import datetime
from django.db.models import Count, Sum, Avg, Min, Max
import random
import openai
from django.core.files.storage import default_storage
from django.http import HttpResponseNotFound
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings

router = Router(tags=["answer"])


    

class Answer(Schema):
    question_uuid: uuidLib.UUID = Field(...)
    answer: str = Field(...)
    
    
def iaquestion(quizz : models.Quizz, question : str, answer : str):
    key = getattr(settings, "OPEN_AI_KEY", None)
    openai.api_key = key
    print('answer',answer)
       
    course = quizz.course.first()
    coursetxt = ""
    if default_storage.exists(course.textPath):
        with default_storage.open(course.textPath, 'rb') as file:
            coursetxt = file.read().decode('utf-8')
    else:
        return None

    # print("J'ai ce texte pour trouver la réponse : '" + coursetxt + "'. La question posée est '" + question + "'. Ma réponse est : ' " + answer + " '. Commence par me répondre si oui ou non la réponse donné est bonne. Si la réponse est bonne, réponds moi 'Oui, Bonne réponse'. Sinon, réponds-moi en me tutoyant en commençant par 'Non,' et en mettant la correction de la question après la virgule.")


        

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Toi, tu es un professeur."},
        {"role": "user",
            "content": "L'élève a ce texte pour trouver la réponse" + coursetxt + ". La question posée à l'élève est : " + question + ". La réponse donnée par l'élève est : " + answer + ". Merci de me dire si la réponse donnée par l'élève est correcte ou non. Si la réponse est correcte, veuillez répondre avec 'La réponse est correcte.'. Si la réponse est incorrecte, veuillez répondre avec 'La réponse est incorrecte.' suivi de la correction appropriée."}
    ]
)


    print("---------")
    print(response.choices[0].message.content)
    correction = [False, ""]
    reponse = response.choices[0].message.content
    reponse_avant_virgule = reponse.split('.')[0]
    reponse_apres_virgule = reponse.split('.')[1]
    print(reponse_avant_virgule)
    if reponse_avant_virgule == "La réponse donnée par l'élève est correcte" or reponse_avant_virgule == "La réponse est correcte":
        correction[0] = True  
    else : 
        correction[0] = False
        
    correction[1] = reponse_apres_virgule

    print(correction)
    
    return correction
                
    
        
    
    
#utliser answer-quizz pour repondre a toutes les questions d'un quizz
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
        return {'message': "successfully created the answer", "uuid": answer.uuid, "question": question.uuid, "user": user.id}
    else:
        return {'message': "user or question does not exist"}


class AnswerList(Schema):
    quizz : uuidLib.UUID = Field(...)
    answers: List[Answer]

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
    if user and quizz:
        response_list = []
        for i in body.answers:
            question = get_object_or_404(models.Question, uuid=i.question_uuid)
            if question:    
                answer, created = models.Answer.objects.get_or_create(user=user, question=question)
                if created:
                    answer.question = question
                answer.givenAnswer = i.answer
                if i.answer=="":
                    i.answer = "Je ne sais pas"
                print("i.answer : " + i.answer)
                aiCorrection = iaquestion(quizz, question.statement, i.answer)
                if aiCorrection is None:
                    return {'message': "file of the course does not exist or is corrupted"}
                answer.isCorrect = aiCorrection[0]
                answer.aiCorrection = aiCorrection[1]
                answer.save()

                answer_dict = {}
                answer_dict['isCorrect'] = aiCorrection[0]
                answer_dict['AICorrection'] = aiCorrection[1]
                answer_dict['question'] = question.uuid
                answer_dict['answer'] = answer.uuid
                answer_dict['givenAnswer'] = i.answer
                response_list.append(answer_dict)
                    
            else:
                return {'message': " one of the question does not exist"}
            
        
        user_quizz_result = models.UserQuizzResult.objects.create(user=user, quizz=quizz)
        score = models.Answer.objects.filter(user=user, question__quizz=quizz, isCorrect=True).count()
        user_quizz_result.score = models.Answer.objects.filter(user=user, question__quizz=quizz, isCorrect=True).count()
        user_quizz_result.save()

        return {'message': "successfully answered the quizz","score" : user_quizz_result.score, "quizz": quizz.uuid, "user": user.id, "answers": response_list}
    else:
        return {'message': "user or quizz does not exist"}
    
    
    
    

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
    
class newAnswer(Schema):    
    answer: str = Field(...)

@router.put("/{uuid_answer}/update")
def update_answer(request, uuid_answer: uuidLib.UUID, new_answer : newAnswer):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    answer.givenAnswer = new_answer.answer
    answer.save()
    return {"message": "successfully updated the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "question_uuid": answer.question.uuid}


@router.delete("/{uuid_answer}/delete")
def delete_answer(request, uuid_answer: uuidLib.UUID):
    answer = get_object_or_404(models.Answer, uuid=uuid_answer)
    answer.delete()
    return {"message": "successfully deleted the answer", "answer_uuid": uuid_answer}





#debug purpose : delete all answers
@router.delete("/delete/all")
def delete_all_answers(request):
    models.Answer.objects.all().delete()
    models.UserQuizzResult.objects.all().delete()
    return {"message": "successfully deleted all answers"}

# from ninja import Schema, Router
# from django.shortcuts import get_object_or_404
# from app import models
# import uuid as uuidLib
# from typing import List
# from pydantic import Field
# import datetime
# from django.db.models import Count, Sum, Avg, Min, Max
# import random
# import openai
# from django.core.files.storage import default_storage
# from django.http import HttpResponseNotFound
# from django.core.exceptions import ObjectDoesNotExist

# router = Router(tags=["answer"])


    

# class Answer(Schema):
#     question_uuid: uuidLib.UUID = Field(...)
#     answer: str = Field(...)
    
    
# def iaquestion(quizz):
#     questions = quizz.question_set.all()
    
   
    
#     if quizz:
#         response_list = []
#         for question in questions:
#             # Récupérer la réponse
#             answer = models.Answer.objects.get(question=question)
            
#             if question:
#                 course = get_object_or_404(models.Course, uuid=quizz.course.first().uuid)
                
#                 content = ""
#                 if default_storage.exists(course.textPath):
#                     with default_storage.open(course.textPath, 'rb') as file:
#                         content = file.read().decode('utf-8')
#                 else:
#                     return HttpResponseNotFound("File not found")
                
#                 # Définir votre clé API OpenAI
#                 openai.api_key = "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"
#                 print(question.statement)
#                 print(answer.givenAnswer)
#                 if answer.givenAnswer == "":
#                     answer.givenAnswer = "Je ne sais pas"

#                 # Utiliser OpenAI ChatCompletion pour obtenir une réponse corrigée pour chaque question-réponse
#                 response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=[
#                     {"role": "system", "content": "Toi, tu es un professeur."},

#                 {"role": "user", "content": "L'élève a ce texte pour trouver la réponse" + content+ "La question posé à l'élève est " +question.statement+ "La réponse donné par l'élève est " + answer.givenAnswer+". Commence par me répondre si oui ou non la réponse donnée est bonne. Si oui, réponds moi <Oui. Bonne réponse>. Si non, donne moi la correction en commencant par <Non. La réponse n'est pas la bonne,> et en mettant la correction après la virgule.>"},
#                 ]
#             )
#             answer_dict = {}
#             reponse = response.choices[0].message.content
#             print(reponse)
#             reponse_avant_virgule = reponse.split('.')[0]
#             print(reponse_avant_virgule)
#             reponse_apres_virgule = reponse.split('.')[1]
#             if reponse_avant_virgule == "Oui"or reponse_avant_virgule=="<Oui":
#                 answer.isCorrect = True
#                 answer_dict['isCorrect'] = True
#             else:
#                 answer.isCorrect = False
#                 answer_dict['isCorrect'] = False
#             answer.aiCorrection = reponse_apres_virgule
#             answer_dict['AICorrection'] = reponse_apres_virgule
#             answer_dict['question'] = question.uuid
#             answer_dict['answer'] = answer.uuid
#             answer_dict['givenAnswer'] = answer.givenAnswer
#             answer.save()
#             response_list.append(answer_dict)
#     return response_list
                
       
        
        
    
    
# #utliser answer-quizz pour repondre a toutes les questions d'un quizz
# @router.post("/create")
# def answer_a_question(request, body: Answer):
#     token = request.headers.get('Authorization')
#     accessToken = token.split(' ')[1]
#     user = get_object_or_404(models.CustomUser, accessToken=accessToken)
#     question = get_object_or_404(models.Question, uuid=body.question_uuid)
    
#     if user and question:
#         answer = models.Answer.objects.create(user=user)
#         answer.question = question
#         answer.givenAnswer = body.answer
#         answer.save()
#         return {'message': "successfully created the answer", "uuid": answer.uuid, "question": question.uuid, "user": user.id}
#     else:
#         return {'message': "user or question does not exist"}


# class AnswerList(Schema):
#     quizz : uuidLib.UUID = Field(...)
#     answers: List[Answer]

# @router.post("/answer-quizz")
# def answer_all_questions(request, body: AnswerList):
#     token = request.headers.get('Authorization')
#     accessToken = token.split(' ')[1]
#     user = get_object_or_404(models.CustomUser, accessToken=accessToken)
#     try:

#         teams = user.team_set.all()
#     except ObjectDoesNotExist:
#         return {'message': "user is not in a team"}
#     quizz = get_object_or_404(models.Quizz, uuid=body.quizz)
#     if user and quizz:
#         for i in body.answers:
#             question = get_object_or_404(models.Question, uuid=i.question_uuid)
#             if question:    
#                 answer, created = models.Answer.objects.get_or_create(user=user, question=question)
#                 if created:
#                     answer.question = question
#                 answer.givenAnswer = i.answer
#                 answer.save()
                
#             else:
#                 return {'message': " one of the question does not exist"}
            
#         aiCorrection = iaquestion(quizz) 
#         user_quizz_result = models.UserQuizzResult.objects.create(user=user, quizz=quizz)
#         score = models.Answer.objects.filter(user=user, question__quizz=quizz, isCorrect=True).count()
#         user_quizz_result.score = models.Answer.objects.filter(user=user, question__quizz=quizz, isCorrect=True).count()
#         user_quizz_result.save()

#         return {'message': "successfully answered the quizz","score" : user_quizz_result.score, "quizz": quizz.uuid, "user": user.id, "answers": aiCorrection}
#     else:
#         return {'message': "user or quizz does not exist"}
    
    
    
    

# @router.get("{quiz_uuid}/answers/all")
# def get_answers_to_one_quiz_for_all_users(request, quiz_uuid: uuidLib.UUID):
#     quizz = get_object_or_404(models.Quizz, uuid=quiz_uuid)
#     teams = quizz.teams.all()   
#     list = []
#     for team in teams:
#         users = team.users.all()
#         for user in users:
#             list.append(user.uuid)
#             answers = models.Answer.objects.filter(user=user)
#             answer_dict = {}
#             for answer in answers:
#                 answer_dict[str(answer.uuid)] = str(answer.question.uuid)
#             list.append(answer_dict)
#     return {'message': "successfully got the answers", "answers": list}
    


# @router.get("/{question_uuid}/answer")
# def get_answer_to_one_question(request, question_uuid: uuidLib.UUID):
#     question = get_object_or_404(models.Question, uuid=question_uuid)
#     token = request.headers.get('Authorization')
#     accessToken = token.split(' ')[1]
#     user = get_object_or_404(models.CustomUser, accessToken=accessToken)
#     if question and user:
#         answer = get_object_or_404(models.Answer, question=question, user=user)
#         return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection, "user" : answer.user.uuid }                          
#     else:
#         return {'message': "user or question does not exist"}
    
# @router.get("/{uuid_answer}/answer")
# def get_answer_to_one_question_by_id(request, uuid_answer: uuidLib.UUID):
#     answer = get_object_or_404(models.Answer, uuid=uuid_answer)
#     return {"message": "successfully got the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "question_uuid": answer.question.uuid, "is_correct": answer.is_correct, "aiCorrection": answer.aiCorrection, "user" : answer.user.uuid}
    
# class newAnswer(Schema):    
#     answer: str = Field(...)

# @router.put("/{uuid_answer}/update")
# def update_answer(request, uuid_answer: uuidLib.UUID, new_answer : newAnswer):
#     answer = get_object_or_404(models.Answer, uuid=uuid_answer)
#     answer.givenAnswer = new_answer.answer
#     answer.save()
#     return {"message": "successfully updated the answer", "answer": answer.givenAnswer, "answer_uuid": answer.uuid, "question_uuid": answer.question.uuid}


# @router.delete("/{uuid_answer}/delete")
# def delete_answer(request, uuid_answer: uuidLib.UUID):
#     answer = get_object_or_404(models.Answer, uuid=uuid_answer)
#     answer.delete()
#     return {"message": "successfully deleted the answer", "answer_uuid": uuid_answer}





# #debug purpose : delete all answers
# @router.delete("/delete/all")
# def delete_all_answers(request):
#     models.Answer.objects.all().delete()
#     models.UserQuizzResult.objects.all().delete()
#     return {"message": "successfully deleted all answers"}