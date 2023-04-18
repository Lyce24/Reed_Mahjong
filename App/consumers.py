# Series of functions to be called when an event happens
# Deals with handoffs and threading for async code

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from channels.exceptions import InvalidGroup
from .models import *
from .serializers import *
from asgiref.sync import sync_to_async
import random


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
            self.room_name,  # `room_id` is the group name
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

    async def disconnect(self):
        # Called when WebSocket closes
        print("Disconnected")

        # Remove connection from group
        try:
            await self.remove_from_group()
        except InvalidGroup:
            pass

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
        # 'discard_tile' => user discards a tile, needs user id + room id + tile suite and number, return none (proceed w game logic)
        # 'draw_tile' (i.e. 'your_turn') => return random tile (suite + number)

        event_type = content.get('type')
        if event_type == 'echo':
            await self.send_json(content)
        elif event_type == 'create_room':
            print(f"Creating room")
            await self.create_room(content)
        elif event_type == 'join_room':
            room_id = content.get('room_id', content)
            await self.join_room(room_id)
        elif event_type == 'leave_room':
            await self.leave_room()
        elif event_type == 'start_game':
            room_id = content.get('room_id')
            await self.start_game(room_id, content)
        else:
            await self.send_json({
                'message': 'not an event type'
            })

        # try:
        #     response = handler(data)
        # except Exception as e:
        #     response = {
        #         'type': 'error',
        #         'data':
        #             'message': str(e)
        #         }
        #     }

        # """
        # # Example code of how to update models
        # pid = content['player_id']
        # try:
        #     player = await self.get_model(pid)
        #     # Stuff
        # except Player.DoesNotExist:
        #     return
        # """

    # Add client to a group with specified room_id

    async def create_room(self, content):
        # make sure player isn't already in room

        # test create_room function from front end
        """ random_room_id = random.randint(10000000, 99999999)
        await self.send_json({
            'message': 'Successfully created room!',
            'room_id': random_room_id,
            'result': 'room_id',
            'status': '202'
        })
        return """
        print("Creating room")
        # create player ID
        client_key = self.scope["session"].session_key
        client_key = 'test'
        print(f'client_key: {client_key}')

        try:
            print("Trying to get player model")
            player = await self.get_player_model(client_key)
        except Player.DoesNotExist:
            print("Player model does not exist")
            player = await self.create_player_model(client_key)

        print("Player model exists")
        # creates random room id and makes sure it's not already in use
        while True:
            random_room_id = random.randint(10000000, 99999999)
            qs = await self.filter_room_models(random_room_id)
            if await sync_to_async(qs.count)() == 0:
                break
            else:
                continue
        
        print("Room ID created")
        # creates a room
        if player.room is None:
            await self.create_room_model(random_room_id)
            await self.send_json({
                'message': 'room_created',
                'room_id': random_room_id,
                'result': 'roomNum',
                'status': '202'
            })
            await self.join_room(random_room_id, content)
        else:
            await self.send_json({
                'message': 'Player already in a room.',
                'status': '400'
            })

    async def join_room(self, room_id, content):

        # test join_room function from front end
        """ await self.send_json({
            'message': 'Successfully joined room!',
            'room_id': room_id,
            'result': 'room_id',
            'status': '202',
        })
        return """
        print("Joining room")
        # NEED TO FIND NEW METHOD FOR IDENTIFYING PLAYERS -- THIS RETURNS NONE
        client_key = self.scope["session"].session_key
        client_key = 'test'
        # try:
        #     player = self.get_player_model(client_key)
        # except Player.DoesNotExist:
        #     player = self.create_player_model(client_key))
        room_result = await self.filter_room_models(room_id)
        qs1 = await self.filter_player_models_room(room_id)
        qs2 = await self.filter_player_models(client_key)
        if await sync_to_async(qs1.count)() == 4:
            print("Room is full")
            await self.send_json({
                'Bad Request': 'Room is full',
                'status': '400'
            })
        elif await sync_to_async(qs2.count)() == 0:
            print("Player does not exist")
            player = await self.create_player_model(client_key)
            player.room = room_result[0]
            await sync_to_async(player.save)()

            await self.serialize_player_data(player, content)
        else:
            print("Player exists")
            player_qs = await self.filter_player_models(client_key)
            player = player_qs[0]
            player.room = room_result[0]
            await sync_to_async(player.save)()
            await self.serialize_player_data(player, content)

<<<<<<< HEAD
    async def leave_room(self):
        client_key = self.scope["session"].session_key
        if await self.filter_player_models(client_key).count() != 0:
            if Player.objects.filter(player_id=self.request.session.session_key)[0].room == None:
                await self.send_json({
                    'message': 'You are not in a room',
                    'status': 400
                })

            player = await self.filter_player_models(client_key)[0]
            curr_room = player.room.room_id
            player.room = None
            await sync_to_async(player.save)()

            if sync_to_async(Player.objects.filter)(room__room_id=curr_room).count() == 0:
                await self.filter_room_models(curr_room).delete()

            await self.remove_from_group()

    async def start_game(self, room_id, content):
        try:
            room = self.get_room_model(room_id)
            if room.game_mode == 0:
                player_result = sync_to_async(Player.objects.filter)(room__room_id=room_id)
                room.game_mode = 1
 
                # devise the distribution algorithm later - temporary random distribution
                for player in player_result:
                    count = 0
                    while count < 14:
                        for key in player.__dict__:
                            if key != 'id' and key != 'player_id' and key != 'room' and key != '_state' and key != 'room_id':
                                player.__dict__[key] = random.randint(0, 3)
                                room.__dict__[key] -= player.__dict__[key]
                                count += player.__dict__[key]
                                
                    await sync_to_async(player.save)()    
                await sync_to_async(room.save)()
                await self.serialize_room_data(room, content)
    
            else:
                self.send_json({
                    'message': 'Game already exists',
                    'status': '400'
                })
        except Room.DoesNotExist:
            self.send_json({
                "message': 'Room doesn't exist"
                'status': '404'
            })


=======
        print(f"Player {player} joined room {room_result[0]}")
>>>>>>> f480595 (updates on creating room)
    # mimic serializer function in views
    # need to make sure the content has all of the necessary fields for Room model from the frontend
    # and omit the `type` key when assigning to fields
    # serializer = PlayerSerializer(player, context={'request': request})
    # just sending a json for now
    async def serialize_player_data(self, player, content):
        serializer = await sync_to_async(PlayerSerializer)(player, context={'content': content})
        is_valid = await sync_to_async(serializer.is_valid)()
        if is_valid:
            # Update object using serializer data asynchronously
            await sync_to_async(serializer.save)()
            await self.send_json({
                'data': serializer.data,
                'status': '202'
            })
        else:
            # serializer data is invalid asynchronously
            errors = await sync_to_async(serializer.error)()
            await self.send_json({
                'errors': errors,
                'status': '400'
            })

<<<<<<< HEAD
    async def serialize_room_data(self, room, content):
        serializer = await sync_to_async(RoomSerializer)(room, context={'content': content})
        is_valid = await sync_to_async(serializer.is_valid)()
        if is_valid:
            await self.send_json({
                'data': serializer.data,
                'status': '200'
            })
        else:
            # serializer data is invalid asynchronously
            errors = await sync_to_async(serializer.error)()
            await self.send_json({
                'errors': errors,
                'status': '400'
            })
=======
    async def leave_room(self, room_id):
        client_key = self.scope["session"].session_key
        client_key = 'test'
        qs = await self.filter_player_models(client_key)
        if (qs.count)() != 0:
            qs = Player.objects.filter(player_id=client_key)
            if qs[0].room == None:
                await self.send_json({
                    'message': 'You are not in a room',
                    'status': 400
                })

            player = await self.filter_player_models(client_key)[0]
            curr_room = player.room.room_id
            player.room = None
            await sync_to_async(player.save)()

            if sync_to_async(Player.objects.filter)(room__room_id=curr_room).count() == 0:
                await self.filter_room_models(curr_room).delete()

    async def start_game(self):
        return
>>>>>>> f480595 (updates on creating room)

    async def add_to_group(self):
        await self.channel_layer.group_add(
            self.room_name,  # `room_id` is the group name
            self.channel_name
        )

    async def remove_from_group(self):
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name
        )

    # methods to access player and room model databases

    @database_sync_to_async
    def get_room_model(self, room_id):
        return Room.objects.get(room_id=room_id)

    @database_sync_to_async
    def create_room_model(self, room_id):
        return Room.objects.create(room_id=room_id)

    @database_sync_to_async
    def filter_room_models(self, room_id):
        return Room.objects.filter(room_id=room_id)

    @database_sync_to_async
    def get_player_model(self, player_id):
        return Player.objects.get(player_id=player_id)

    @database_sync_to_async
    def create_player_model(self, player_id):
        return Player.objects.create(player_id=player_id)

    @database_sync_to_async
    def filter_player_models(self, player_id):
        return Player.objects.filter(player_id=player_id)

    @database_sync_to_async
    def filter_player_models_room(self, room_id):
        return Player.objects.filter(room__room_id=room_id)
