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
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if Room.objects.filter(player_1=self.request.session.session_key).count() != 0:
            return Response({'Message': 'You have already created a room'}, status=status.HTTP_400_BAD_REQUEST)

        while True:
            random_room_id = random.randint(10000000, 99999999)
            if Room.objects.filter(room_id=random_room_id).count() == 0:
                break
    
        room = Room.objects.create(room_id=random_room_id, player_1= self.request.session.session_key)
        room.save()
        self.request.session['room_id'] = room.room_id
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


class JoinRoom(APIView):
    lookup_url_kwarg = 'room_id'
    
    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session['room_id'] != None:
            return Response({'Message': 'You have already joined a room'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)
    
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if self.request.session['room_id'] != None:
            return Response({'Message': 'You have already joined a room'}, status=status.HTTP_400_BAD_REQUEST)
        
        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(room_id=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_id'] = code

                room = Room.objects.get(room_id=code)
                if room.player_2 == '':
                    room.player_2 = self.request.session.session_key
                elif room.player_3 == '':
                    if room.player_2 == self.request.session.session_key:
                        return Response({'Bad Request': 'You have already joined this room.'}, status=status.HTTP_400_BAD_REQUEST)
                    room.player_3 = self.request.session.session_key
                elif room.player_4 == '':
                    if room.player_2 == self.request.session.session_key or room.player_3 == self.request.session.session_key:
                        return Response({'Bad Request': 'You have already joined this room.'}, status=status.HTTP_400_BAD_REQUEST)
                    room.player_4 = self.request.session.session_key
                else:
                    return Response({'Bad Request': 'Room is full.'}, status=status.HTTP_400_BAD_REQUEST)
                
                room.save()
                serializer = RoomSerializer(room, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)


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
                if room.player_4 != '':
                    room.game_mode = 1
                    room.save()
                    serializer = RoomSerializer(room, context={'request': request})
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else :
                    return Response({'Message': 'Room not full'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Message': 'Game already exist'},status=status.HTTP_400_BAD_REQUEST)
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
    def get(self, request):
        if 'room_id' in self.request.session:
            room_id = self.request.session['room_id']
            self.request.session.pop('room_id')
            room = Room.objects.get(room_id=room_id)
            id = self.request.session.session_key
            if room.player_1 == id:
                room.delete()
            elif room.player_2 == id:
                room.player_2 = ''
                room.save()
            elif room.player_3 == id:
                room.player_3 = ''
                room.save()
            elif room.player_4 == id:
                room.player_4 = ''
                room.save()
              
            return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
        return Response({'Message': 'You are not in a room'}, status=status.HTTP_400_BAD_REQUEST)


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
