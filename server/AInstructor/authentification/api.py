from ninja import Router
from app.models import CustomUser
from ninja.security import django_auth, HttpBearer


import json
from django.http import JsonResponse

router = Router()
