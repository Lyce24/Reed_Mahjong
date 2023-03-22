from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
import random

from .serializers import *
from .models import *

# Create your views here.


class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()


class TileView(viewsets.ModelViewSet):
    serializer_class = TileSerializer
    queryset = Tile.objects.all()


# APIViews
'''
1. Create a room
2. Join a room
3. Show all rooms
4. Room detail
'''

class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def get(self, request):
        while True:
            random_room_id = random.randint(10000000, 99999999)
            if Room.objects.filter(room_id=random_room_id).count() == 0:
                break
                
        room = Room.objects.create(room_id=random_room_id)
        serializer = RoomSerializer(room, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class JoinRoom(APIView):
    lookup_url_kwarg = 'room_id'

    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(room_id=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_id'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    

class RoomDetail(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            serializer = RoomSerializer(room, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
    def put(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            serializer = RoomSerializer(room, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            room.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
