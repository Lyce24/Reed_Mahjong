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

class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        while True:
            random_room_id = random.randint(10000000, 99999999)
            if Room.objects.filter(room_id=random_room_id).count() == 0:
                break
        room = Room.objects.create(room_id = random_room_id)
        player = Player.objects.create(player_id=self.request.session.session_key, room = room)
        room.save()
        player.save()
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

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
            player_result = Player.objects.filter(room__room_id=pk)
            player_id = ''
            count = 0
            for player in player_result:
                player_id += str(player.id) + ' '
                count += 1
                
            data = {
                'room_id': room.room_id,
                'game_mode': room.game_mode,
                'player_count': count,
                'player_id': player_id
            }
            return Response(data, status=status.HTTP_200_OK)
        except Room.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

# '''
# Game Operations - Create a game, Delete a game
# '''
class CreateGame(APIView):
    serializer_class = RoomSerializer
    
    def get(self, request, pk):
        try:
            room = Room.objects.get(room_id=pk)
            if room.game_mode == 0:
                room_id = pk
                if Player.objects.filter(room__room_id=room_id).count() != 4:
                    room.game_mode = 1
                    room.save()
                    serializer = RoomSerializer(room, context={'request': request})
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else :
                    return Response({'Message': 'Room not full'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Message': 'Game already exist'},status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:
            return Response({"Message': 'Room doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
        
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
        
        
# '''
# Player Operations - Create a player, Delete a player
# '''

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    
class JoinRoom(APIView):
    lookup_url_kwarg = 'room_id'
    def get(self, request):
        player_result = Player.objects.filter(player_id=self.request.session.session_key)
        if len(player_result) > 0:
            if player_result[0].room != None:
                return Response({'Message': 'You have already joined a room'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message': 'Input Room ID'}, status=status.HTTP_200_OK)
    
    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(room_id=code)
            if len(room_result) > 0:
                self.request.session['room_id'] = code
                print(Player.objects.filter(room__room_id=code).count())
                if Player.objects.filter(room__room_id=code).count() ==4:
                    return Response({'Bad Request': 'Room is full'}, status=status.HTTP_400_BAD_REQUEST)
                
                elif Player.objects.filter(player_id=self.request.session.session_key).count() == 0:
                    player = Player.objects.create(player_id=self.request.session.session_key, room = room_result[0])
                    player.save()
        
                    serializer = PlayerSerializer(player, context={'request': request})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                else:
                    player = Player.objects.filter(player_id=self.request.session.session_key)[0]
                    player.room = room_result[0]
                    player.save()
                    
                    serializer = PlayerSerializer(player, context={'request': request})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


            return Response({'Bad Request': 'Invalid Room ID'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a ID key'}, status=status.HTTP_400_BAD_REQUEST)
    

class PlayerInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        if Player.objects.filter(player_id=self.request.session.session_key).count() == 0:
            return Response({'Message': 'You are not in a room'}, status=status.HTTP_400_BAD_REQUEST)
    
        elif Player.objects.filter(player_id=self.request.session.session_key)[0].room == None:
            return Response({'Message': 'You are not in a room'}, status=status.HTTP_400_BAD_REQUEST)
        
        data = {
            'room_id': Player.objects.filter(player_id=self.request.session.session_key)[0].room.room_id
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
    
class PlayerLeaveRoom(APIView):
    def get(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        if Player.objects.filter(player_id=self.request.session.session_key).count() != 0:
            if Player.objects.filter(player_id=self.request.session.session_key)[0].room == None:
                return Response({'Message': 'You are not in a room'}, status=status.HTTP_400_BAD_REQUEST)
            
            player = Player.objects.filter(player_id=self.request.session.session_key)[0]
            room_id = player.room.room_id
            player.room = None
            player.save()
            
            if Player.objects.filter(room__room_id=room_id).count() == 0:
                Room.objects.filter(room_id=room_id).delete()
                
            return Response({'Message': 'Leave room successfully'}, status=status.HTTP_200_OK)

        return Response({'Message': 'You are not in a room'}, status=status.HTTP_400_BAD_REQUEST)
        

