import jwt
from ninja import Router, Schema
from app import models 
import json, uuid as uuidLib
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ninja import Router

from AInstructor import settings
from app import models

router = Router(tags=["Team"])
key = getattr(settings, "SECRET_KEY", None)


@router.get('/')
def main(request):
   
    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(models.CustomUser, accessToken=token)

    teams = models.Team.objects.filter(users=user)

    team_data = [{'uuid': team.uuid, 'name': team.name, 'color': team.color} for team in teams]

    return JsonResponse({'teams': team_data})

class TeamSchema(Schema):
    name: str
    color: str

@router.post('/')
def new(request, body: TeamSchema):
    """Create a new team"""
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    content = jwt.decode(token, key, algorithms=['HS256'])

    request = json.loads(request.body.decode('utf-8'))
    message = ""

    try:
        user = get_object_or_404(models.CustomUser, accessToken=token)
        team = models.Team.objects.create(name=body.name, color=body.color, owner=user)
        team.users.add(user)
        massage = "Team created"
    except:
       message = "Error while creating the team"

    return JsonResponse({'error': message})


@router.delete('/{uuid}')
def delete(request, uuid : uuidLib.UUID):

    try:
        team = get_object_or_404(models.Team, uuid=uuid)
        team.delete()
        error = False
    except:
        error = True
    return JsonResponse({'error': error})


@router.put('/{uuid}')
def update(request, uuid : uuidLib.UUID):
    request = json.loads(request.body.decode('utf-8'))['team']
    error = False

    team = models.Team.objects.get(uuid=uuid)
    team.name = request['name']
    team.color = request['color']
    team.description = request['description']
    team.save()

    return JsonResponse({'error': error})


@router.get('/{uuid}')
def overview(request, uuid : uuidLib.UUID):
    """Get the overview of a team"""
    team = get_object_or_404(models.Team, uuid=uuid)
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


class removeUser(Schema):
    uuid: uuidLib.UUID
    id: list[int]

@router.post("/remove-users")
def removeUser(request, body: removeUser):
    error = ""
    for id in body.id:
        user  = get_object_or_404(models.CustomUser, id=id)
        team = get_object_or_404(models.Team, uuid=body.uuid)
        if user == team.owner:
            error = "You can't remove the owner of the team"
        else:
            team.users.remove(user)
    return JsonResponse({'error': error, "message": "User(s) removed"})
  

class addUser(Schema):
    uuid: uuidLib.UUID
    users_email: list[str]

@router.post('/add-users/')
def addUser(request, body: addUser):
    request = json.loads(request.body.decode('utf-8'))
    error = False

    for email in body.users_email:
        try:
            user = get_object_or_404(models.CustomUser, email=email)
            team = get_object_or_404(models.Team, uuid=body.uuid)
            team.users.add(user, clear = False)
        except:
            error = True

    return JsonResponse({'error': error})




@router.get("/{uuid}/courses/")
def get_courses_by_team(request, uuid: uuidLib.UUID):
    """get all the courses of one team"""
    team = get_object_or_404(models.Team, uuid=uuid)
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
