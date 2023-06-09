from ninja import Router
from app.models import CustomUser
from app.models import Groupe
import json
from django.http import JsonResponse

router = Router(tags=["Groups"])




@router.post('/', auth=None)
def main(request): 
    request = json.loads(request.body.decode('utf-8'))
    
    user = CustomUser.objects.get(id=request['id'])
    groups = Groupe.objects.filter(user=user)

    team_data = [{'teamUUID': group.group_id, 'name': group.name, 'color': group.color} for group in groups]

    return JsonResponse({'teams': team_data})




@router.post('/overview')
def overview(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request['teamUUID'])

    team = Groupe.objects.get(group_id = request['teamUUID'])
    users = team.user.all()
    users_data = [
        {
            'last_name': user.last_name, 
            'first_name': user.first_name,
            'is_teacher': user.is_teacher,
            'email': user.email, 

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
        team = Groupe.objects.get(group_id = request['modelPrimaryKey'])
        user = CustomUser.objects.get(first_name=request['modelFieldLine']['first_name'], last_name=request['modelFieldLine']['last_name'], email=request['modelFieldLine']['email'], is_teacher=request['modelFieldLine']['is_teacher'])
        team.user.remove(user)
    except :
        

        error = True

    return JsonResponse({'error' : error})





@router.post('/addUser')
def addUser(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try :
        team = Groupe.objects.get(group_id = request['modelPrimaryKey'])
        user = CustomUser.objects.get(email=request['PrimaryKeyElementAdd'])
        team.user.add(user)
    except :
        error = True

    return JsonResponse({'error' : error})


@router.post('/new')
def new(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False

    try :
        user = CustomUser.objects.get(id = request['userID'])
        team = Groupe.objects.create(name = request['name'], color = request['color'])
        team.user.add(user)
    except :
        error = True
    
    return JsonResponse({'error' : error})


@router.post('/delete')
def delete(request):
    request = json.loads(request.body.decode('utf-8'))
    print(request)
    error = False


    try :
        team = Groupe.objects.get(group_id = request['teamUUID'])
        team.delete()
    except :
        error = True
    
    return JsonResponse({'error' : error})