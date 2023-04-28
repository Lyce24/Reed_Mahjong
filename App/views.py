from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import random

from .serializers import *
from .models import *


# Create your views here.


# APIViews
'''
1. Create a room
2. Join a room
3. Show all rooms
4. Room detail
'''

'''
Room Operations - Create a Room, Join a Room, Show all rooms, Delete Room
'''

class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    