from ninja import Router
from app.models import CustomUser
from app.models import Team
import json
from django.http import JsonResponse

router = Router(tags=["Team"])


Create
Read
Update
Delete

@router.post('/', auth=None)
def main(request):
    request = json.loads(request.body.decode('utf-8'))

    user = CustomUser.objects.get(id=request['id'])
    teams = Team.objects.filter(user=user)

    team_data = [{'uuid': team.uuid, 'name': team.name, 'color': team.color} for team in teams]

    return JsonResponse({'teams': team_data})


@router.get('/{uuid}')
def overview(request, uuid):
    # request = json.loads(request.body.decode('utf-8'))
    # print(request['teamUUID'])

    team = Team.objects.get(uuid=uuid)
    users = Team.users.all()
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


@router.post('/removeUser')
def removeUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try:
        team = Team.objects.get(uuid=request['modelPrimaryKey'])
        user = CustomUser.objects.get(first_name=request['modelFieldLine']['first_name'],
                                      last_name=request['modelFieldLine']['last_name'],
                                      email=request['modelFieldLine']['email'],
                                      isTeacher=request['modelFieldLine']['isTeacher'])
        Team.users.remove(user)
    except:

        error = True

    return JsonResponse({'error': error})


@router.post('/addUser')
def addUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try:
        team = Team.objects.get(uuid=request['modelPrimaryKey'])
        user = CustomUser.objects.get(email=request['PrimaryKeyElementAdd'])
        Team.users.add(user)
    except:
        error = True

    return JsonResponse({'error': error})


@router.post('/new')
def new(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try:
        user = CustomUser.objects.get(id=request['userID'])
        team = Team.objects.create(name=request['name'], color=request['color'])
        Team.users.add(user)
    except:
        error = True

    return JsonResponse({'error': error})


@router.post('/delete')
def delete(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try:
        team = Team.objects.get(uuid=request['teamUUID'])
        team.delete()
    except:
        error = True

    return JsonResponse({'error': error})
