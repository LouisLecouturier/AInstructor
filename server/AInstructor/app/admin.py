from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import * 
from django.apps import apps

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser

models = apps.get_app_config('app').get_models()


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ["username", "email"]

admin.site.register(CustomUser, CustomUserAdmin)

class AdminFields(admin.ModelAdmin):
    def get_list_display(self, request):
        model = self.model
        fields = [field.name for field in model._meta.fields]
        print(model)
        print(fields)
        return fields


for model in models:
    try:
        admin.site.register(model, AdminFields)
    except Exception:
        print("Erreur pas de rendu pour le model model:", model)
        print(Exception)
        pass

