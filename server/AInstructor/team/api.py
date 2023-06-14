import json
import uuid as uuidLib

import jwt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ninja import Router

from AInstructor import settings
from app import models

router = Router(tags=["Team"])
key = getattr(settings, "SECRET_KEY", None)


@router.get('/')
def main(request):
    print(request.headers.get('Authorization'))

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=token)

    teams = models.Team.objects.filter(users=user)

    team_data = [{'uuid': team.uuid, 'name': team.name, 'color': team.color} for team in teams]

    return JsonResponse({'teams': team_data})


@router.post('/')
def new(request):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    content = jwt.decode(token, key, algorithms=['HS256'])

    request = json.loads(request.body.decode('utf-8'))['team']
    error = False

    user = get_object_or_404(CustomUser, accessToken=token)
    team = Team.objects.create(name=request['name'], color=request['color'])
    team.users.add(user)

    return JsonResponse({'error': error})


@router.delete('/{uuid}')
def delete(request, uuid):
    error = False
    try:
        team = models.Team.objects.get(uuid=uuid)
        team.delete()
    except:
        error = True

    return JsonResponse({'error': error})


@router.put('/{uuid}')
def update(request, uuid):
    request = json.loads(request.body.decode('utf-8'))['team']
    error = False

    team = Team.objects.get(uuid=uuid)
    team.name = request['name']
    team.color = request['color']
    team.description = request['description']
    team.save()

    return JsonResponse({'error': error})


@router.get('/{uuid}')
def overview(request, uuid):
    # request = json.loads(request.body.decode('utf-8'))
    # print(request['teamUUID'])

    team = models.Team.objects.get(uuid=uuid)
    users = team.users.all()
    users_data = [{
        'uuid': user.id,
        'last_name': user.last_name,
        'first_name': user.first_name,
        'isTeacher': user.isTeacher,
        'email': user.email,
    } for user in users]

    return JsonResponse({
        'name': team.name,
        'color': team.color,
        'description': team.description,
        'users': users_data
    }
    )


@router.post('/{uuid}/remove-users')
def removeUser(request, uuid):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False
    for email in request['emails']:
        user = CustomUser.objects.get(email=email)
        team = Team.objects.get(uuid=uuid)
        team.users.remove(user)

    return JsonResponse({'error': error})


@router.post('/{uuid}/add-users')
def addUser(request, uuid):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    for email in request['emails']:
        if email == '':
            return JsonResponse({'error': True})
        user = CustomUser.objects.get(email=email)
        team = Team.objects.get(uuid=uuid)
        team.users.add(user)

    return JsonResponse({'error': error})


@router.get("/{uuid}/courses/")
def get_courses_by_team(request, uuid: uuidLib.UUID):
    """get all the courses of one team"""
    team = get_object_or_404(models.Team, uuid=uuid)
    print(team)
    courses = models.Course.objects.filter(team=team)

    result = []
    for course in courses:
        course_info = {
            'uuid': course.uuid,
            'name': course.name,
            'theme': course.theme,
            'color': course.color,
            'file': course.uploadedFile.path,
            # 'text': course.text,
        }
        result.append(course_info)
    return result
