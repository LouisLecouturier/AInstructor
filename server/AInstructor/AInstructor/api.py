from ninja import NinjaAPI
from app.models import User
import json
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.base import ContentFile
import os

api = NinjaAPI()

def checkIfUserExist(mail):
    try:
        user = User.objects.get(mail=mail)
        return True
    except User.DoesNotExist:
        return False


@api.post("/signup")
def signup(request):
    error_messages = {}
    error = False
    request = {
        'firstname': 'Antoine',
        'lastname': 'MAES',
        'password': '1234',
        'email': 'antoine.maesoutlook.fr',
        'phone': '0763138826',
        'isTeacher': True
    }

    NewUser = User(first_name = request['firstname'], last_name = request['lastname'], mail = request['email'], password = request['password'], is_prof = request['isTeacher'], phone = request['phone'])

    try : 
        NewUser.full_clean()
        if checkIfUserExist(request['email']) == False :
            NewUser.save()
            print("User saved")
        else : 
            mailError = ["This mail is already used"]
            error_messages['mail'] = mailError
            error = True
            print("User not saved")
            

    except ValidationError as e:
        error_messages = e.message_dict
        error = True
          
    returnJSON = {
        'error': error,
        'error_messages': error_messages
    }
    
    return returnJSON
    

    
@api.post('/upload')
def upload(request ):
    file: InMemoryUploadedFile = request.FILES.get('file')

    # Vérifiez si un fichier a été envoyé
    if file:
        # Créez un nom de fichier unique pour éviter les conflits
        filename = file.name
        path = os.path.join('', filename)

        # Enregistrez le fichier
        with open(path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Faites quelque chose avec le fichier enregistré, par exemple enregistrez le chemin dans une base de données

        return {'message': 'Image uploaded successfully'}
    else:
        return {'message': 'No file provided'}
   
