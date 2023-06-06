from django.db import models
import uuid
from django.core import validators
from django.core.exceptions import ValidationError
from django.core.validators import validate_image_file_extension, RegexValidator
import os

from app.models import CustomUser

alphanumeric_validator = RegexValidator(r'^[0-9a-zA-Z\- ]*$', 'Only alphanumeric characters, dashes, spaces are allowed.')


class Team(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    name = models.CharField(max_length=30, validators= [alphanumeric_validator])
    users = models.ManyToManyField(CustomUser)
    color = models.CharField(max_length=7, default = "#000000")