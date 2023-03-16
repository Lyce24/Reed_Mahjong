from rest_framework import serializers
from .models import *

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')
        
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_id', 'status')
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student 
        fields = ('id', 'name', 'email', 'document', 'phone', 'registrationDate')

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = ('suite', 'number')