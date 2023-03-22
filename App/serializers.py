from rest_framework import serializers
from .models import *


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_id')
        
class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player 
        fields = ('id', 'name', 'room')

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = ('suite', 'number')