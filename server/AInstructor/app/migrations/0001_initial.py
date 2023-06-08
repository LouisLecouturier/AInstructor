# Generated by Django 4.2.1 on 2023-06-07 22:38

import app.models
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('profil_picture', models.ImageField(blank=True, max_length=254, null=True, upload_to=app.models.user_picture_path, validators=[django.core.validators.validate_image_file_extension])),
                ('is_teacher', models.BooleanField(default='False')),
                ('last_connexion', models.DateField(auto_now=True, null=True)),
                ('jwt_access', models.CharField(default=0, max_length=500, null=True)),
                ('jwt_refresh', models.CharField(default=0, max_length=500, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, default='New Course', max_length=127, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('theme', models.CharField(blank=True, default='Theme', max_length=127, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('uploaded_file', models.FileField(upload_to=app.models.upload_to_cours)),
                ('text', models.TextField(blank=True, null=True)),
                ('color', models.CharField(blank=True, default='#000000', max_length=7, validators=[django.core.validators.RegexValidator('^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\\D*\\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$', 'The password must contain different case, number, and special character')])),
                ('uploaded_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Groupe',
            fields=[
                ('group_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('user', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Quesionnaire',
            fields=[
                ('questionnaire_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('temporaire', models.BooleanField(default=False, null=True)),
                ('date_end', models.DateField(null=True)),
                ('date_creation', models.DateField(auto_now=True, null=True)),
                ('title', models.CharField(blank=True, default='New test', max_length=127, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('description', models.CharField(blank=True, default='description : ', max_length=254, null=True, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('theme', models.CharField(blank=True, max_length=127, null=True, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')])),
                ('score', models.SmallIntegerField(blank=True, default=0, null=True)),
                ('nbr_question_total', models.PositiveSmallIntegerField(blank=True, default=0, null=True)),
                ('nbr_QCM', models.PositiveSmallIntegerField(blank=True, default=0, null=True)),
                ('difficulty', models.CharField(blank=True, max_length=254, null=True)),
                ('course', models.ManyToManyField(to='app.course')),
                ('editable_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='editableBy', to=settings.AUTH_USER_MODEL)),
                ('sign_in', models.ManyToManyField(blank=True, related_name='sign_in', to='app.groupe')),
            ],
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('response_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('response_user', models.TextField(blank=True, null=True)),
                ('correction', models.BooleanField(default=False)),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='app.quesionnaire')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type_question', models.CharField(choices=[('QCM', 'question à choix multiples'), ('QO', 'question ouverte')], default='QO', max_length=3)),
                ('statement', models.TextField(null=True)),
                ('questionnaire', models.ForeignKey(null=True, on_delete=django.db.models.deletion.RESTRICT, to='app.quesionnaire')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=app.models.generate_unique_filename)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='images', to='app.course')),
            ],
        ),
    ]