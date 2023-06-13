import jwt
from ninja import Router
from app.models import CustomUser
from app.models import Team
import json
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
    print(request.headers.get('Authorization'))

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(CustomUser, accessToken=token)

    teams = Team.objects.filter(users=user)

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
        team = Team.objects.get(uuid=uuid)
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

    team = Team.objects.get(uuid=uuid)
    users = team.users.all()
    users_data = [{
            'uuid': user.id,
            'last_name': user.last_name,
            'first_name': user.first_name,
            'isTeacher': user.isTeacher,
            'email': user.email,
            } for user in users ]

    return JsonResponse({
            'name': team.name,
            'color': team.color,
            'description': team.description,
            'users': users_data
        }
    )


# {
#     uuid: 'uuid',
#     id: ["3", "4", "5"]
# }



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





    

