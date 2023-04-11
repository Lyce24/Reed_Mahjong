# Series of functions to be called when an event happens
# Deals with handoffs and threading for async code

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import *
from asgiref.sync import sync_to_async
import json
class AppConsumer(AsyncJsonWebsocketConsumer):
    """
    This app  consumer handles websocket connections for chat clients.
    It uses AsyncJsonWebsocketConsumer, which means all the handling functions
    must be async functions, and any sync work (like ORM access) has to be
    behind database_sync_to_async or sync_to_async. For more, read
    http://channels.readthedocs.io/en/latest/topics/consumers.html
    """
    # Called on connection
    async def connect(self):
        # To accept the connection call:
        await self.accept()

        await self.send_json(({
            'type': 'connection_established',
            "message": "You are now connected!",
        }))

        # self.room_name = self.scope['url_route']['kwargs']['room_id']
        self.room_name = "placeholder"
        # Add the connection to a named group to enable 
        # sending messages to a group of connections at once.
        await self.channel_layer.group_add(
            self.room_name, # `room_id` is the group name
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "send_json_message",
                "message": "You are now connected to the group!",
            }
        )
        
    async def send_json_message(self, event):
        message = event["message"]
        await self.send_json(message)

    async def disconnect(self, close_code):
        # Called when WebSocket closes
        print("Disconnected")

        # Remove connection from group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    async def receive_json(self, content):
        # Handles incoming JSON message from client
        print(f"Received JSON message:{content}")

        # 'register' => user registers, return a random new user id in uuid4 
        # 'create_room' => user creates a room, needs user id as own, return a random room id in uuid4 if success otherwise indicate fail 
        # 'join_room' => user joins a room, needs user id and room id, return a success or fail message
        # 'start_game' => user starts a game, needs user id and room id, return a success or fail message
        # 'game_move' => 
        # 'game_end' =>
        # 'game_reset' =>
        # 'game_pause' =>
        # 'your_turn' => 

        event_type = content.get('type')
        data = content.get('data')
        match event_type:
            case 'create_room': 
                hanlder = create_room
            case 'join_room': 
                handler = join_room 
            case 'start_game': 
                handler = start_game 
        
        try:
            response = hanlder(data) 
        except Exception as e:
            response = {
                'type': 'error',
                'data': {
                    'message': str(e)
                }
            }

        return await self.send_json(response)
    

        event_type = content.get('type')
        if event_type == 'placeholder':
            # placeholder: just echo the message back to the client 
            return await self.send_json(({
                'echo': content
            }))

        """
        # Example code of how to update models 
        pid = content['player_id']
        try:
            player = await self.get_model(pid)
            # Stuff
        except Player.DoesNotExist:
            return
        """

    async def get_room_model(self, model_id):
        return await sync_to_async(Room.objects.get)(room_id=model_id)
    
    async def get_player_model(self, model_id):
        return await sync_to_async(Player.objects.get)(player_id=model_id)
    


    # Methods with websocket_ in front

    '''
    For the client (frontend) to trigger these methods, send custom websocket event:
    socket.send(JSON.stringify({
        'type': 'websocket.event',
    }))
    '''