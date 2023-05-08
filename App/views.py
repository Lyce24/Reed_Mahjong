from rest_framework import viewsets
from .serializers import RoomSerializer, PlayerSerializer
from .models import Room, Player


# APIViews


class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()


class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
