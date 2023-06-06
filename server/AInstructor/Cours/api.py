from ninja import Router
from app.models import CustomUser
from .models import Course
import json
from django.http import JsonResponse
from ninja import NinjaAPI, Schema, Form, File
from ninja.files import UploadedFile
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate
import jwt, datetime,uuid
from django.shortcuts import render
from django.conf import settings
import openai
import json

router = Router()



@router.post("/upload", auth=None)
def upload_file(request, theme, file: UploadedFile = File(...)):
    file_data = file.read()
    name = file.name
    course = models.Course.objects.create(name=name, theme=theme)
    course.uploaded_file = file
    course.save()
    return {"message": "File uploaded successfully"}



@router.get("/getcourse", auth=None)
def get_course(request, course_id) : 
    cour = models.Course.objects.get(course_id = course_id)
    raw_text = cour.uploaded_file.read()
    return {"message": raw_text}