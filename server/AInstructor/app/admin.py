from django.contrib import admin
from .models import * 
from django.apps import apps


models = apps.get_app_config('app').get_models()


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

