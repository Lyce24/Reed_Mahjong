# Series of functions to be called when an event happens
# Deals with handoffs and threading for async code

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import *
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

    async def disconnect(self, close_code):
        # Called when WebSocket closes
        print("Disconnected")

        # Remove connection from group
        await self.remove_from_group()

    async def receive_json(self, content):
        # Handles incoming JSON message from client
        print(f"Received JSON message:{content}")

        '''
        FORMATTING:
        'type': 'getVariable',
        'result_type': 'variable', //* should be set by backend, put here now for testing
        'room_id': `000`, //* should be set by backend, put here now for testing
        'status': '202', //* should be set by backend, put here now for testing
        '''

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
            await self.create_room(content)
        # elif event_type == 'discard_tile':
        #    await self.discard_tile(content)
        elif event_type == 'join_room':
            room_id = content.get('room_id')
            await self.join_room(room_id, content)
        # elif event_type == 'leave_room':
        #     await self.leave_room()
        # elif event_type == 'start_game':
        #     room_id = content.get('room_id')
        #     await self.start_game(room_id, content)
        else:
            await self.send_json({
                'message': 'not an event type'
            })

    # Add client to a group with specified room_id

    async def create_room(self, content):
        print("Creating room")
        
        while True:
            random_room_id = random.randint(10000000, 99999999)
            qs = await self.filter_room_models(random_room_id)
            if await sync_to_async(qs.count)() == 0:
                break
            else:
                continue

        print("Room ID created: ", random_room_id)
        # creates a room

        try:
            print("Trying to get player model")
            player = await self.create_player_model(player_id = content.get('username'))
            print(player.__dict__)
            if player.room_id is None:
                room = await self.create_room_model(random_room_id)
                player.room = room
                room.player1 = player.player_id
                await sync_to_async(room.save)()
                await sync_to_async(player.save)()
            else:
                await self.send_json({
                    'message': 'Player already in a room.',
                    'status': '400'
                })
        except Player.DoesNotExist:
            print("Player model does not exist")
            room = await self.create_room_model(random_room_id)
            player = await self.create_player_model(player_id = content.get('username'))
            player.room = room
            print(player.__dict__)
            await sync_to_async(room.save)()
            await sync_to_async(player.save)()

        print("Player model exists")

        await self.send_json({
            'message': 'room_created',
            'room_id': random_room_id,
            'result_type': 'room_id',
            'status': '202'
        })
        
        print("self.channel_name: ", self.channel_name)
        print("self.room_name: ", self.room_name)

        # test create_room function from front end
        """ random_room_id = random.randint(10000000, 99999999)
        await self.send_json({
            'message': 'Successfully created room!',
            'room_id': random_room_id,
            'result_type': 'room_id',
            'status': '202',
        })
        return """

    async def join_room(self, room_id, content):

        # test join_room function from front end
        """ await self.send_json({
            'message': 'Successfully joined room!',
            'room_id': room_id,
            'result_type': 'room_id',
            'status': '202',
        })
        return """
        print("Joining room")
        
        room_result = await self.filter_room_models(room_id)

        player = await self.create_player_model(player_id = content.get('username'))
        room = await sync_to_async(room_result.first)()    
        
        if room.player2 == "":
            room.player2 = player.player_id
            player.room = room
            await sync_to_async(player.save)()
            await sync_to_async(room.save)()
 
        elif room.player3 == "":
            room.player3 = player.player_id
            player.room = room    
            await sync_to_async(player.save)()
            await sync_to_async(room.save)()   
        
        elif room.player4 == "":
            room.player4 = player.player_id
            player.room = room
            await sync_to_async(player.save)()
            await sync_to_async(room.save)()
            await self.send_json({
                "message": "Room is full",
                "status": "200"
            })
            
        else:
            print("Room is full")
            await self.send_json({
                'Bad Request': 'Room is full',
                'status': '400'
            })
            

    # async def leave_room(self):
    #     client_key = self.channel_name
    #     player_qs = await self.filter_player_models(client_key)
    #     if await sync_to_async(player_qs.count)() != 0:
    #         first_player_qs = await sync_to_async(player_qs.first)()
    #         if first_player_qs.room == None:
    #             await self.send_json({
    #                 'message': 'You are not in a room',
    #                 'status': 400
    #             })

    #         player = await sync_to_async(player_qs.first)()
    #         curr_room = player.room.room_id
    #         player.room = None
    #         await sync_to_async(player.save)()

    #         player_qs2 = await sync_to_async(Player.objects.filter)(room__room_id=curr_room)
    #         if (player_qs2.count)() == 0:
    #             room_qs = await self.filter_room_models(curr_room)
    #             (room_qs.delete)()

    #         await self.remove_from_group()

    # async def start_game(self, room_id, content):
    #     try:
    #         room = self.get_room_model(room_id)
    #         if room.game_mode == 0:
    #             player_result = sync_to_async(
    #                 Player.objects.filter)(room__room_id=room_id)
    #             room.game_mode = 1

    #             # devise the distribution algorithm later - temporary random distribution
    #             for player in player_result:
    #                 count = 0
    #                 while count < 13:
    #                     for key in player.__dict__:
    #                         if key != 'id' and key != 'player_id' and key != 'room' and key != '_state' and key != 'room_id':
    #                             player.__dict__[key] = random.randint(0, 3)
    #                             room.__dict__[key] -= player.__dict__[key]
    #                             count += player.__dict__[key]

    #                 await sync_to_async(player.save)()
    #             await sync_to_async(room.save)()
    #             # serialize room data?

    #         else:
    #             self.send_json({
    #                 'message': 'Game already exists',
    #                 'status': '400'
    #             })
    #     except Room.DoesNotExist:
    #         self.send_json({
    #             "message': 'Room doesn't exist"
    #             'status': '404'
    #         })
            
    # async def discard_tile(self, content):
    #     client_key = self.channel_name
    #     player_qs = await self.filter_player_models(client_key)
    #     player = await sync_to_async(player_qs.first)()
    #     tile = content['tile']
    #     player.__dict__[tile] -= 1
    #     await sync_to_async(player.save)()
    #     # serialize player data?

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

    # methods to access player and room model databases:
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
