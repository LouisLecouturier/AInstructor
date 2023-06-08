from ninja import NinjaAPI, Schema, Form, File, UploadedFile, Field, Router
import uuid, os,json
from django.shortcuts import get_object_or_404
from pydantic import BaseModel
from datetime import date
from typing import List

from app import models


router = Router()

