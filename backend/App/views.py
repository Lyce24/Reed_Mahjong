from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import TodoSerializer, RoomSerializer
from .models import Todo, Room

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    
def welcome_page(request):
    return HttpResponse("Hello world ! ")