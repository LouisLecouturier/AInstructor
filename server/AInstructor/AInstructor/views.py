from django.http import HttpResponse

def rest(request):
    print(request.method)
    return HttpResponse(request.method)

