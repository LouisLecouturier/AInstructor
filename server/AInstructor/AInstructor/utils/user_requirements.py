from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


def validate_password_strength(value):
    try:
        validate_password(value)
        return True

    except ValidationError as e:
        print(e.messages)
        return False

    

def validate_username(value):
    from app.models import CustomUser
    if CustomUser.objects.filter(username=value).exists():
        return False
    else:
        return True
       
    

def validate_mail(value):
    from app.models import CustomUser
    double_check = 0
    try:
        validate_email(value)
        double_check += 1
    except ValidationError as e:
        print(e.messages)
        return False
    if CustomUser.objects.filter(email=value).exists():
        return False
    else:
        double_check += 1
    
    if double_check == 2:
        return True


def validate_not_empty(value):
    if len(value) == 0 and value.isspace():

        return False
    else:
        return True
       
