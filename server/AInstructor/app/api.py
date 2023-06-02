from ninja import NinjaAPI, Schema, Form
from ninja.security import django_auth, HttpBearer
from django.contrib.auth import authenticate
import uuid
import jwt
from django.shortcuts import render
from app import models

myuuid = uuid.uuid4()

def get_this_user(username):
	this_user= models.CustomUser.objects.get(username = username)
	return this_user
def get_this_token(token):
    this_token = models.CustomUser.objects.get(jwt = token) 
    return this_token

class GlobalAuth(HttpBearer):
    def authenticate(self, request, token):
        # try:
        #     decoded_token = jwt.decode(token, str(myuuid), algorithms=['HS256'])
        #     user_id = decoded_token.get('user_id')
        #     user = get_this_user(user_id)
        #     print(user)
        #     if user is not None:
        #         return token, user
        # except jwt.ExpiredSignatureError:
        #     pass  # Handle token expiration error
        # except jwt.InvalidTokenError:
        #     pass  # Handle invalid token error

        user = get_this_token(token)
        if token == user.jwt:
            return token, user.username
        elif jwt.ExpiredSignatureError:
            return "Handle token expiration error"
        elif jwt.InvalidTokenError:
            return "Handle invalid token error"

    def create_token(self, user_id: str) -> str:
        payload = {'user_id': user_id}
        #jwt.encode(payload,secret key,algorithm)
        return jwt.encode(payload, str(myuuid), algorithm='HS256')



api = NinjaAPI(auth=GlobalAuth())



class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        if token == "supersecret":
            return token


@api.get("/bearer", auth=AuthBearer())
def bearer(request):
    return {"token": request.auth}



@api .get("/hello")
def hello(request, username = "world"):
    return "Hello {username}"



class UserSchema(Schema):
    username: str
    email: str
    first_name: str
    last_name: str

class Error(Schema):
    message: str

@api.get("/me",response={200: UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Please sign in first"}
    return request.user

""" à checker pour update la "session"
def update_token(user, token):
    employee = get_object_or_404(Employee, id=employee_id)
    for attr, value in payload.dict().items():
        setattr(employee, attr, value)
    employee.save()
    return {"success": True}
"""




@api.post("/token", auth=None) 
def get_token(request, username: str = Form(...), password: str = Form(...)):
    user = get_this_user(username)
    auth_perm = authenticate(request, username=username, password=password)
    #user = authenticate(request, username=username, password=password)
    print(auth_perm)
    if auth_perm is not None:
        bearer_token = GlobalAuth().create_token(user.id)
        #bearer_token = user.id
        user.jwt = bearer_token

        user.save()
        return {"token": bearer_token}
    else :
        return {"message" : "pas les bons creditials"}
   


