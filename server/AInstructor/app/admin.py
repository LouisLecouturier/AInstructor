from django.contrib import admin
from .models import  *

# Register your models here.

# models  = apps.get_app_config('app').get_models()
# for model in models:
#     admin.site.register(model)

class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = [field.name for field in User._meta.fields if field.name != "id"]

admin.site.register(User, UserAdmin)