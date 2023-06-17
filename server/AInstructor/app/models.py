from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid as uuidLib
from django.core.validators import validate_image_file_extension, RegexValidator

# Create your models here.

AlphanumericValidator = RegexValidator(r'^[a-zA-Z0-9\s()]+$',
                                       'Only alphanumeric characters are allowed and parenthesis.')
AlphanumericValidatorPlus = RegexValidator(
    r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$',
    'The password must contain different case, number, and special character')


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
    name = models.CharField(max_length=30, validators=[AlphanumericValidator])
    users = models.ManyToManyField(CustomUser)
    color = models.CharField(max_length=7, default="#000000", blank=True)
    description = models.CharField(max_length=254, validators=[AlphanumericValidator], default="description : ",
                                   null=True, blank=True)


class Course(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    name = models.CharField(max_length=127, validators=[AlphanumericValidator], default="New Course", blank=True)
    subject = models.CharField(max_length=127, validators=[AlphanumericValidator], default="Theme", blank=True)
    filePath = models.TextField(blank=False)
    text = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True, default="desc")
    uploadedBy = models.ForeignKey(CustomUser, on_delete=models.RESTRICT, null=True, blank=True)
    color = models.CharField(max_length=7, default="#000000", blank=True)
    team = models.ManyToManyField(Team, related_name='team', blank=True)
    creationDate = models.DateField(auto_now=True, auto_now_add=False, null=True)
    deliveryDate = models.DateField(auto_now=False, auto_now_add=False, null=True)
    textPath = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Quizz(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ManyToManyField(Course)
    temporary = models.BooleanField(default=False, null=True)
    dateEnd = models.DateField(auto_now=False, auto_now_add=False, null=True)
    dateCreation = models.DateField(auto_now=True, auto_now_add=False, null=True)
    title = models.CharField(max_length=127, validators=[AlphanumericValidator], default="New test", blank=True)
    description = models.CharField(max_length=254, validators=[AlphanumericValidator], default="description : ",
                                   null=True, blank=True)
    theme = models.CharField(max_length=127, validators=[AlphanumericValidator], null=True, blank=True)
    status = models.CharField(max_length=127, validators=[AlphanumericValidator], default="pending", blank=True)

    def __str__(self):
        return self.title


class UserQuizzResult(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuidLib.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quizz = models.ForeignKey(Quizz, on_delete=models.SET_NULL, null=True)
    score = models.SmallIntegerField(default=0)
    sumbitionDate = models.DateField(auto_now_add=True)


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
