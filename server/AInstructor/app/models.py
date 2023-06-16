from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Count, Sum, Avg, Min, Max
from django.db.models.signals import post_save

from django.core import validators
from django.core.exceptions import ValidationError
from django.core.validators import validate_image_file_extension, RegexValidator
import os, datetime, uuid as uuidLib
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
# Create your models here.

AlphanumericValidator = RegexValidator(r"^[a-zA-Z0-9 !\"$%&'()*+,\-./:;<=>?@[\\]^_`{|}~À-ÖØ-öø-ÿ]+$",
                                       'Only alphanumeric characters are allowed and parenthesis.')



def user_picture_path(instance, filename):
    return f'profilePicture/{instance.username}.png'


class CustomUser(AbstractUser):
    pass
    # add additional fields in here
    profilePicture = models.ImageField(upload_to=user_picture_path, max_length=254, null=True, blank=True,
                                       validators=[validate_image_file_extension])  # add uplad to
    isTeacher = models.BooleanField(default='False')
    lastConnexion = models.DateField(auto_now=True, auto_now_add=False, null=True)
    accessToken = models.CharField(max_length=500, null=True, default=0)
    refreshToken = models.CharField(max_length=500, null=True, default=0)
    address = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)
    city = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)
    country = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)
    postalCode = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)
    bio = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)
    phone = models.CharField(max_length=254, validators=[AlphanumericValidator], null=True, blank=True)

    def __str__(self):
        return self.username

   
class Team(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False) 
    name = models.CharField(max_length=30, validators= [AlphanumericValidator])
    users = models.ManyToManyField(CustomUser)
    color = models.CharField(max_length=7, default ="#000000",  blank = True)
    description = models.CharField(max_length=254, validators= [AlphanumericValidator], default = "description ", null = True,  blank = True)
    owner = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, null=True, blank=True, related_name='owned_teams')
    def __str__(self):
        return self.name

class Team(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    name = models.CharField(max_length=30, validators=[AlphanumericValidator])
    users = models.ManyToManyField(CustomUser)
    color = models.CharField(max_length=7, default="#000000", blank=True)
    description = models.CharField(max_length=254, validators=[AlphanumericValidator], default="description : ",
                                   null=True, blank=True)


def upload_to_course(instance, filename):
    return f'cours/{instance.uuid}/{filename}.md'


class Course(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    name = models.CharField(max_length=127, validators=[AlphanumericValidator], default="New Course", blank=True)
    subject = models.CharField(max_length=127, validators=[AlphanumericValidator], default="Theme", blank=True)
    uploadedFile = models.FileField(upload_to=upload_to_course, storage=None, max_length=100)
    text = models.TextField(null=True, blank=True)
    description = models.CharField(max_length=254, validators=[AlphanumericValidator], default="Hello World"),
    uploadedBy = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, null=True, blank=True)
    color = models.CharField(max_length=7, default="#000000", blank=True)
    team = models.ManyToManyField(Team, related_name='team', blank=True)
    creationDate = models.DateField(auto_now=True, auto_now_add=False, null=True)
    deliveryDate = models.DateField(auto_now=False, auto_now_add=False, null=True)

    textPath = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class TeamStatistiques(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    team = models.ForeignKey(Team, on_delete = models.CASCADE)
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    mean = models.SmallIntegerField(default = 0, null= True)
    median = models.SmallIntegerField(default = 0 , null= True)
    Variance = models.SmallIntegerField(default = 0, null= True)
    min = models.SmallIntegerField(default = 0, null= True)
    max = models.SmallIntegerField(default = 0, null= True)


    def __str__(self):
        return self.team.name + " " + self.course.name





class Quizz(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    course = models.ManyToManyField(Course)
    temporary = models.BooleanField(default=False, null=True)
    dateEnd = models.DateField(auto_now=False, auto_now_add=False, null=True)
    dateCreation = models.DateField(auto_now=True, auto_now_add=False, null=True)
    title = models.CharField(max_length=127, validators=[AlphanumericValidator], default="New test", blank=True)
    description = models.CharField(max_length=254, validators=[AlphanumericValidator], default="description : ",
                                   null=True, blank=True)
    theme = models.CharField(max_length=127, validators=[AlphanumericValidator], null=True, blank=True)
    teams = models.ManyToManyField(Team, related_name='teams', blank=True)
    status = models.CharField(max_length=127, validators=[AlphanumericValidator], default="pending", blank=True)
    owner = models.ManyToManyField(CustomUser, related_name='quizzes')

    def __str__(self):
        return self.title


class UserQuizzResult(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quizz = models.ForeignKey(Quizz, on_delete=models.SET_NULL, null=True)
    score = models.SmallIntegerField(default=0)
    sumbitionDate = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " " + self.quizz.title
    
    
    

class UserStatistiques(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    progress = models.SmallIntegerField(default = 0)
    lastConnexion = models.DateField(auto_now=True, auto_now_add=False, null = True)
    mean = models.SmallIntegerField(default =0)

    min = models.SmallIntegerField(default = 0)
    max = models.SmallIntegerField(default = 0)

    def autoincrementnbquestion(self):
        nbquiz = UserQuizzResult.objects.filter(user = self.user, quizz = self.course__quizz).count()
        print(nbquiz)
        return nbquiz

    def __str__(self):
        return self.user.username + " " + self.course.name





class Question(models.Model):
    openQuestion = "QO"
    multipleChoiceQuestion = "MCQ"
    Type_Question_Choice = [
        (multipleChoiceQuestion, "Question a choix multiples"),
        (openQuestion, "Question ouverte")
    ]

    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    questionType = models.CharField(max_length=3, choices=Type_Question_Choice, default=openQuestion)
    statement = models.TextField(null=True)
    quizz = models.ForeignKey(Quizz, on_delete=models.RESTRICT, null=True)

    def __str__(self):
        return self.statement


# class PossibleAnswer(models.Model):
#     question = ""
#     answer = "rouge", "bleu"

#     isCorrect = True


class Answer(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, null=True)
    question = models.ForeignKey(Question, on_delete=models.RESTRICT, null=True)
    givenAnswer = models.TextField(null=True, blank=True)
    aiCorrection = models.TextField(null=True, blank=True)
    isCorrect = models.BooleanField(default=False)

    def __str__(self):
        return self.givenAnswer



@receiver(post_save, sender=UserQuizzResult)
def create_user_statistics(sender, instance, **kwargs):
    """create or add to the user and the team statistics when a user submit a quizz"""
    user = instance.user
    quizz = instance.quizz
    course = quizz.course.all().first() #uniquement si un quizz se refere a un seul cours(modiefier la fonction pour scalabilité)
    
    #___student part___
    mean= UserQuizzResult.objects.filter(user=user, quizz__course=course).aggregate(Avg('score'))['score__avg']
    min = UserQuizzResult.objects.filter(user=user, quizz__course=course).aggregate(Min('score'))['score__min']
    max = UserQuizzResult.objects.filter(user=user, quizz__course=course).aggregate(Max('score'))['score__max']
    nbQuizz = Quizz.objects.filter(course=course).count()
    nbQuizzDone = UserQuizzResult.objects.filter(user=user, quizz__course=course).count()
    progress = nbQuizzDone / nbQuizz * 100

    try : 
        user_statistics= UserStatistiques.objects.get(user=user, course=course)

    except UserStatistiques.DoesNotExist:
        user_statistics = UserStatistiques.objects.create(user=user, course=course)
    
    user_statistics.mean = mean
    user_statistics.min = min
    user_statistics.max = max
    user_statistics.progress = progress
    user_statistics.save()

    #___team part___
    team =Team.objects.filter(users=user).first()
    try :
        team_stat = TeamStatistiques.objects.get(team=team, course=course)
    except TeamStatistiques.DoesNotExist:
        team_stat = TeamStatistiques.objects.create(team=team, course=course)
    

    team_stat.mean = UserQuizzResult.objects.filter(quizz__course=course, user__in=team.users.all()).aggregate(Avg('score'))['score__avg']

    team_stat.min = UserQuizzResult.objects.filter(quizz__course=course, user__in=team.users.all()).aggregate(Min('score'))['score__min']
    team_stat.max = UserQuizzResult.objects.filter(quizz__course=course, user__in=team.users.all()).aggregate(Max('score'))['score__max']

    medianPlace = UserQuizzResult.objects.filter(quizz__course=course, user__in=team.users.all()).aggregate(Count('score'))['score__count'] /2 
    if medianPlace == 0:
        medianPlace += 1
    team_stat.median = UserQuizzResult.objects.filter(quizz__course=course, user__in=team.users.all()).order_by('score')[int(medianPlace)].score
    team_stat.save()

