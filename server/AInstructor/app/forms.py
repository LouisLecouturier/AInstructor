from django import forms
from .models import User

class UserForm(forms.ModelForm):
  class Meta:
    model = User
    fields = ['user_id', 'user_pw', 'user_name', 'user_email', 'user_phone', 'user_type']
    labels = {
        'user_id': '',
        'user_pw': '',
        'user_name': '',
        'user_email': '',
        'user_phone': '',
        'user_type': '',
    }