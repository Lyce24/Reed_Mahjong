from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


from .serializers import *
from .models import *

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class TileView(viewsets.ModelViewSet):
    serializer_class = TileSerializer
    queryset = Tile.objects.all()
    
def welcome_page(request):
    return HttpResponse("Hello world ! ")

    
@api_view(['PUT', 'DELETE', 'Get'])
def room_detail(request, pk):
    if request.method == 'GET':
        try:
            room = Room.objects.get(room_id=pk)
            serializer = RoomSerializer(room, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = RoomSerializer(room, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        room.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
    
