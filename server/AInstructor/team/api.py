from ninja import Router
from app.models import CustomUser
from app.models import Team
import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


router = Router(tags=["Team"])

# TODO : Remake the whole API to match CRUD operations and modularity

# Create
# Read
# Update
# Delete

@router.get('/')
def main(request):

    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    user = get_object_or_404(CustomUser, accessToken=token)

    teams = Team.objects.filter(users=user)

    team_data = [{'uuid': team.uuid, 'name': team.name, 'color': team.color} for team in teams]

    return JsonResponse({'teams': team_data})



@router.post('/')
def new(request):
    token = request.headers.get('Authorization')
    token = token.split(' ')[1]
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try:
        user = get_object_or_404(CustomUser, accessToken=token)
        team = Team.objects.create(name=request['name'], color=request['color'])
        team.users.add(user)
    except:
        error = True

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



@router.get('/{uuid}')
def overview(request, uuid):
    # request = json.loads(request.body.decode('utf-8'))
    # print(request['teamUUID'])

    team = Team.objects.get(uuid=uuid)
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


# {
#     uuid: 'uuid',
#     id: ["3", "4", "5"]
# }



@router.post('/remove-users')
def removeUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    for id in request['id']:
        try:
            user = CustomUser.objects.get(id=id)
            team = Team.objects.get(uuid=request['uuid'])
            team.users.remove(user)
        except:
            error = True

    return JsonResponse({'error': error})


@router.post('/add-users')
def addUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    for email in request['users_email']:
        try:
            user = CustomUser.objects.get(email=email)
            team = Team.objects.get(uuid=request['uuid'])
            team.users.add(user)
        except:
            error = True

    return JsonResponse({'error': error})


