from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import random

from .serializers import *
from .models import *

# Create your views here.

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

'''
Room Operations - Create a Room, Join a Room, Show all rooms, Delete Room
'''


class RoomView(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

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
    
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Bug: always defaults to None and raises BAD_REQUEST error
        code = request.POST.get(self.lookup_url_kwarg, None)
        if code != None:
            room_result = Room.objects.filter(room_id=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_id'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room ID'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a ID key'}, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteRoom(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            room.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class RoomDetail(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            serializer = RoomSerializer(room, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

'''
Game Operations - Create a game, Delete a game
'''
class CreateGame(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            if room.game_mode == 0:
                room.game_mode = 1
                room.save()
                serializer = RoomSerializer(room, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class DeleteGame(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            if room.game_mode == 1:
                room.game_mode = 0
                room.save()
                serializer = RoomSerializer(room, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
'''
Player Operations - Create a player, Delete a player
'''

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

class PlayerInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'room_id': self.request.session.get('room_id')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
    
class PlayerLeaveRoom(APIView):
    def get(self, request, format=None):
        if 'room_id' in self.request.session:
            self.request.session.pop('room_id')
              
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)


# # # In the home page, player should select whether to create a room or join a room
# # # if join a room, then the player should enter the room code and the player name
# class PlayerJoinRoom(APIView):
#     serializer_class = PlayerSerializer
    
#     def post(self, request):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
            
#         player_name = self.request.session.get('name')
#         player_room = self.request.session.get('room_id')
#         if player_name != None and player_room != None:
#             room_result = Room.objects.filter(room_id=player_room)
#             if len(room_result) > 0:
#                 room = room_result[0]
#                 player = Player.objects.create(name=request.data.get('name'), room=request.data.get('room'))
#                 serializer = PlayerSerializer(player, context={'request': request})
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    
    
# class PlayerLeaveRoom(APIView):
#     serializer_class = PlayerSerializer
    
#     def get(self, request, pk):
#         try:
#             player = Player.objects.get(pk=pk)
#             player.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Player.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
