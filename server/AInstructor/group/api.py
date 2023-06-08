from ninja import Router
from app.models import CustomUser
from app.models import Groupe
import json
from django.http import JsonResponse

router = Router()




@router.post('/', auth=None)
def main(request): 
    request = json.loads(request.body.decode('utf-8'))
    print(request['id'])

    user = CustomUser.objects.get(id = request['id'])
    teams = user.team_set.all()
    team_data = [{'teamUUID': team.uuid, 'name': team.name, 'color': team.color} for team in teams]

    return JsonResponse({'teams' : team_data})




@router.post('/overview')
def overview(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request['teamUUID'])

    team = Groupe.objects.get(uuid = request['teamUUID'])
    users = team.users.all()
    users_data = [
        {
            'first_name': user.first_name,
            'email': user.email, 
            'last_name': user.last_name, 
            'is_teacher': user.is_teacher
        } 
        for user in users
    ]

    return JsonResponse(
        {
            'name' : team.name,
            'users' : users_data
        }
    )




@router.post('/removeUser')
def removeUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try :
        team = Groupe.objects.get(uuid = request['modelPrimaryKey'])
        user = CustomUser.objects.get(first_name=request['modelFieldLine']['first_name'], last_name=request['modelFieldLine']['last_name'], email=request['modelFieldLine']['email'], is_teacher=request['modelFieldLine']['is_teacher'])
        team.users.remove(user)
    except :
        

        error = True

    return JsonResponse({'error' : error})





@router.post('/addUser')
def addUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try :
        team = Groupe.objects.get(uuid = request['modelPrimaryKey'])
        user = CustomUser.objects.get(email=request['PrimaryKeyElementAdd'])
        team.users.add(user)
    except :
        error = True

    return JsonResponse({'error' : error})


@router.post('/new')
def new(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try :
        team = Groupe.objects.create(name = request['name'], color = request['color'])
        user = CustomUser.objects.get(id = request['userID'])
        team.users.add(user)
    except :
        error = True
    
    return JsonResponse({'error' : error})