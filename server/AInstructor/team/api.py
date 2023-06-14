import jwt
from ninja import Router, Schema
from app import models 
import json, uuid as uuidLib
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from AInstructor import settings

router = Router(tags=["Team"])
key = getattr(settings, "SECRET_KEY", None)

# TODO : Remake the whole API to match CRUD operations and modularity

# Create
# Read
# Update
# Delete

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
    print(content)

    request = json.loads(request.body.decode('utf-8'))
    message = ""

    print(token)


    try:
        user = get_object_or_404(models.CustomUser, accessToken=token)
        team = models.Team.objects.create(name=body.name, color=body.color, owner=user)
        team.users.add(user)
        massage = "Team created"
    except:
       message = "Error while creating the team"

    return JsonResponse({'error': message})


@router.delete('/{uuid}')
def delete(request, uuid):

    try:
        team = get_object_or_404(models.Team, uuid=uuid)
        team.delete()
        error = False
    except:
        error = True
    return JsonResponse({'error': error})



@router.get('/{uuid}')
def overview(request, uuid : uuidLib.UUID):
    """Get the overview of a team"""
    team = get_object_or_404(models.Team, uuid=uuid)
    users = team.users.all()
    users_data = [{
            'last_name': user.last_name,
            'first_name': user.first_name,
            'isTeacher': user.isTeacher,
            'email': user.email,
            } for user in users ]

    return JsonResponse({
            'name': team.name,
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
    print(request)
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
            #'text': course.text,
        }
        result.append(course_info)
    return result


