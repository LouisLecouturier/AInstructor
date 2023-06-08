from django.db import models
import uuid
from django.core import validators
from django.core.exceptions import ValidationError
from django.core.validators import validate_image_file_extension, RegexValidator
# Create your models here.

AlphanumericValidator = RegexValidator(r'^[a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

class User(models.Model):
    user = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # unique=True
    first_name = models.CharField(error_messages="{'error' : True}",max_length=30, validators= [AlphanumericValidator])
    last_name = models.CharField(max_length=30,validators= [AlphanumericValidator])
    profil_picture = models.ImageField( max_length = 254, validators = [validate_image_file_extension] ,null=True, blank=True) 
    mail = models.EmailField(max_length=254)
    password = models.CharField(max_length = 254)           #Password validation settings
    is_prof = models.BooleanField(default = 'False')
    phone = models.CharField(max_length=10, validators= [validators.MinLengthValidator(10), validators.MaxLengthValidator(10)])
    date_creation = models.DateField(auto_now=False, auto_now_add=True, null = True)
    last_connexion = models.DateField(auto_now=True, auto_now_add=False, null = True)
    
    def __str__(self):
        return self.first_name + " " + self.last_name
    




# class Groupe(models.Model):
#     group_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
#     name = models.CharField(max_length=30, validators= [AlphanumericValidator])
#     user = models.ManyToManyField(User)


# def upload_to_cours(instance, filename):
#     return f'cours/{instance.course_id}/{filename}'


# class Course(models.Model):
#     course_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=127, validators= [AlphanumericValidator])
#     theme = models.CharField(max_length=127, validators= [AlphanumericValidator])
#     uploaded_file = models.FileField(upload_to=upload_to_cours, storage=None, max_length=100)
#     uploaded_by = models.ForeignKey(User, on_delete = models.RESTRICT) 


# def generate_unique_filename(instance, filename):
#     extension = filename.split('.')[-1] 
#     random_name = str(uuid.uuid4()) 
#     return os.path.join({instance.course_id}/'course_files/', random_name + '.' + extension)

# class Image(models.Model):
#     course_id =models.ForeignKey(Course, on_delete=models.RESTRICT, related_name='images')
#     image = models.ImageField(upload_to=generate_unique_filename)


# class Text(models.Model):
#     course =models.ForeignKey(Course, on_delete=models.RESTRICT, related_name='text')
#     text =  models.TextField()
#     text_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

# class Quesionnaire(models.Model):
#     questionnaire_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     course = models.ManyToManyField(Course)  
#     temporaire = models.BooleanField(default = False)
#     date_end = models.DateField(auto_now=False, auto_now_add=False, null = True)
#     date_creation = models.DateField(auto_now=True, auto_now_add=False, null = True)
#     title = models.CharField(max_length=127, validators= [AlphanumericValidator])
#     description = models.CharField(max_length=254, validators= [AlphanumericValidator])
#     theme = models.CharField(max_length=127, validators= [AlphanumericValidator])
#     score = models.SmallIntegerField(default = 0)
#     nbr_question_total = models.PositiveSmallIntegerField(default = 0)
#     nbr_QCM = models.PositiveSmallIntegerField(default = 0)
#     difficulty = models.CharField(max_length = 254)    


# class Question(models.Model):
#     question_id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     question_ouverte = "QO"
#     question_choix_multiple = "QCM"
#     Type_Question_Choice = [
#         (question_choix_multiple, "question Ã  choix multiples"),
#         (question_ouverte , "question ouverte")
#         ]

#     type_question = models.CharField(max_length = 3, choices = Type_Question_Choice, default = question_ouverte)
#     statement = models.TextField()
#     questionnaire = models.ForeignKey(Quesionnaire, on_delete = models.RESTRICT)


# class Response(models.Model):
#     response_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable =False)
#     response_user = models.TextField()
#     correction = models.BooleanField(default = False)
#     user_id = models.ForeignKey(User, on_delete = models.RESTRICT)
#     question = models.ForeignKey(Quesionnaire, on_delete = models.RESTRICT)