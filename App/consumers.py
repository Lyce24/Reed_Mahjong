# Series of functions to be called when an event happens
# Deals with handoffs and threading for async code

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import *
import json
from asgiref.sync import sync_to_async, async_to_sync
from django.db.utils import IntegrityError
import random

numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
suites = ['bamboo', 'wan', 'circle']

'''
url = ws://localhost:8000/ws/socket-server
'''

class AppConsumer(AsyncJsonWebsocketConsumer):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = "test"
        
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
                    # Add the connection to a named group to enable
                # sending messages to a group of connections at once.

        
    async def send_json_message(self, event):
        message = event["message"]
        await self.send_json(message)

    async def disconnect(self, close_code):
        # # Called when WebSocket closes
        # print("Disconnected")

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
        room_id = content.get('room_id')
        event_type = content.get('type')
        if event_type == 'echo':
            await self.send_json(content)
        elif event_type == 'create_room':
            await self.create_room(content)
        elif event_type == 'draw_tile':
            await self.draw_tile(room_id, content)
        elif event_type == 'discard_tile':
           await self.discard_tile(room_id, content)
        elif event_type == 'join_room':
            await self.join_room(room_id, content)
        elif event_type == 'start_game':
            await self.start_game(room_id)
        elif event_type == 'reset_game':
            await self.reset_game(room_id)
        else:
            await self.send_json({
                'message': 'not an event type'
            })

    # Add client to a group with specified room_id

    '''
    Room Operations
    '''
    async def create_room(self, content):
        print("Creating room")
        # creates a room

        try:
            while True:
                random_room_id = random.randint(10000000, 99999999)
                qs = await self.filter_room_models(random_room_id)
                if await sync_to_async(qs.count)() == 0:
                    break
                else:
                    continue
            player = await self.create_player_model(player_id = content.get('username'))
            room = await self.create_room_model(random_room_id)
            player.room = room
            room.player1 = player.player_id
            await sync_to_async(room.save)()
            await sync_to_async(player.save)()

            self.room_name = "Room" + str(random_room_id)
            
            # Add the connection to a named group to enable
                # sending messages to a group of connections at once.
            await self.channel_layer.group_add(
                    self.room_name,  # `room_id` is the group name
                    self.channel_name
                )

            await self.channel_layer.group_send(
                    self.room_name,
                    {
                        "type": "send_json",
                        "message": f"You are now connected to the group {self.room_name}!",
                        'room_id': str(random_room_id),
                        'result_type': 'room_id',
                        'status': '202'
                    }
                )
            
            await self.send_json({
                'message': 'room_created',
                'room_id': random_room_id,
                'result_type': 'room_id',
                'status': '202'
            })
            
            
        except IntegrityError:
            await self.send_json({
                'message': 'Player already in a room.',
                'status': '400'
            })


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
        
        player_result = await self.filter_player_models(player_id = content.get('username')) 
        if await sync_to_async(player_result.count)() == 0:
            player = await self.create_player_model(player_id = content.get('username'))
        else:
            player = await sync_to_async(player_result.first)()
        room_result = await self.filter_room_models(room_id)
        if await sync_to_async(room_result.count)() == 0:
            await self.send_json({
                'message': 'Room does not exist',
                'status': '400'
            })
            return
        else:
            room = await sync_to_async(room_result.first)()
        
        if room.player1 == player.player_id or room.player2 == player.player_id or room.player3 == player.player_id or room.player4 == player.player_id:
            print("Player already in room")
            await self.send_json({
                'Bad Request': 'Player already in room',
                'status': '400'
            })
            return 
        
        self.room_name = "Room" + str(room_id)
            
            # Add the connection to a named group to enable
                # sending messages to a group of connections at once.
        await self.channel_layer.group_add(
                    self.room_name,  # `room_id` is the group name
                    self.channel_name
                )

        await self.channel_layer.group_send(
                self.room_name,
                {
                        "type": "send_json",
                        "message": f"{content.get('username')} join {self.room_name}!",
                        'room_id': str(room_id),
                        'result_type': 'room_id',
                        'status': '202'
                }
            )
            
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
            await self.start_game(room_id)
            
        else:
            print("Room is full")
            await self.send_json({
                'Bad Request': 'Room is full',
                'status': '400'
            })
            
        await self.send_json({
                "message": "Player joined",
                "room_id": room_id,
                "result_type": "room_id",
                "status": "202"
            })
        return 
    
    
    '''
    
    Game Operations
    
    '''
    async def start_game(self, room_id):
        try:
            room_result = await self.filter_room_models(room_id)
            room = await sync_to_async(room_result.first)()
            
            if room.game_mode == 0:
                if room.player1 == "" or room.player2 == "" or room.player3 == "" or room.player4 == "":
                    self.send_json({
                        'message': 'Not enough players',
                        'status': '400'
                    })
                    return
                
                else:
                    print("Starting game")
                    room.game_mode = 1
                    await sync_to_async(room.save)()
                    players = [room.player1, room.player2, room.player3, room.player4]
                    zhuangjia = random.choice(players)
                    room.current_player = zhuangjia
                    room.zhuangjia = zhuangjia
                    await sync_to_async(room.save)()
                    
                      
                    for player in players:
                        print(player)
                        player_result = await self.filter_player_models(player)
                        player1 = await sync_to_async(player_result.first)()

                        tiles = []
                        while len(tiles) < 13:
                            # draw a random tile
                            suite = random.choice(suites)
                            number = random.choice(numbers)
                            new_tile = {'suite': suite, 'number': number}
                            key = suite + number
                            # if no more such tile in the room, draw another tile
                            while room.__dict__[key] == 0:
                                suite = random.choice(suites)
                                number = random.choice(numbers)
                                new_tile = {'suite': suite, 'number': number}
                                key = suite + number

                            tiles.append(new_tile)
                            player1.__dict__[key] += 1
                            room.__dict__[key] -= 1

                        await sync_to_async(player1.save)()
                        await sync_to_async(room.save)()
                        tiles_json = json.dumps(tiles)
                        
                        await self.channel_layer.group_send(
                            self.room_name,
                            {
                                "type": "send_json",
                                "message": "Player drawn tiles",
                                'player': player,
                                'tiles' : tiles_json,
                                'room_id': str(room_id),
                                'result_type': 'room_id',
                                'status': '202'
                            }
                        )
                        
                        
                    player_result = await self.filter_player_models(zhuangjia)
                    player1 = await sync_to_async(player_result.first)()
                        
                    tiles = []
                    suite = random.choice(suites)
                    number = random.choice(numbers)
                    new_tile = {'suite' : suite, 'number' : number}
                    key = suite + number
                    while room.__dict__[key] == 0:
                        suite = random.choice(suites)
                        number = random.choice(numbers)
                        new_tile = {'suite' : suite, 'number' : number}
                        key = suite + number
                                
                    tiles.append(new_tile)
                    player1.__dict__[key] += 1
                    room.__dict__[key] -= 1
                            
                    await sync_to_async(player1.save)()
                    await sync_to_async(room.save)()
                    tiles_json = json.dumps(tiles)
                        
                    await self.channel_layer.group_send(
                            self.room_name,
                            {
                            "type": "send_json",
                            'message': 'Zhuangjia tile drawn',
                            'player': player,
                            'tiles' : tiles_json,
                            'room_id': str(room_id),
                            'result_type': 'room_id',
                            'status': '202'
                    })
                    
                    await self.channel_layer.group_send(
                            self.room_name,
                            {
                            "type": "send_json",
                            'message': 'Game started',
                            'room_id': str(room_id),
                            'result_type': 'room_id',
                            'status': '202'
                    })
            else:
                print("Game already started")
                self.send_json({
                    'message': 'Game already exists',
                    'status': '400'
                })
        except Room.DoesNotExist:
            self.send_json({
                "message': 'Room doesn't exist"
                'status': '404'
            })
            
    async def reset_game(self, room_id):
        try:
            room_result = await self.filter_room_models(room_id)
            room = await sync_to_async(room_result.first)()
            
            if room.game_mode == 1:
                    print("Restarting game")
                    room.game_mode = 0
                    await sync_to_async(room.save)()
                    players = [room.player1, room.player2, room.player3, room.player4]
                    
                    for player in players:
                        player_result = await self.filter_player_models(player)
                        player1 = await sync_to_async(player_result.first)()
                        
                        for suite in suites:
                            for number in numbers:
                                key = suite + number
                                player1.__dict__[key] = 0
                                room.__dict__[key] = 4
                                
                        await sync_to_async(player1.save)()
                        await sync_to_async(room.save)()
                        
                    await self.channel_layer.group_send(
                            self.room_name,
                            {
                            "type": "send_json",
                            'message': 'Game reset',
                            'room_id': str(room_id),
                            'result_type': 'room_id',
                            'status': '202'
                    })
            else:
                print("Game already started")
                self.send_json({
                    'message': 'Game already exists',
                    'status': '400'
                })
        except Room.DoesNotExist:
            self.send_json({
                "message': 'Room doesn't exist"
                'status': '404'
            })
            
    async def draw_tile(self, room_id, content):
        try:
            room_result = await self.filter_room_models(room_id)
            room = await sync_to_async(room_result.first)()
            
            count = 0
            for suite in suites:
                for number in numbers:
                    key = suite + number
                    count += room.__dict__[key]
                    break
                    
            if count != 0 :     
                player_result = await self.filter_player_models(content.get('username'))
                player1 = await sync_to_async(player_result.first)()
                            
                suite = random.choice(suites)
                number = random.choice(numbers)
                new_tile = {'suite' : suite, 'number' : number}
                key = suite + number
                while room.__dict__[key] == 0:
                    suite = random.choice(suites)
                    number = random.choice(numbers)
                    new_tile = {'suite' : suite, 'number' : number}
                    key = suite + number
                                
                print(key)  
                player1.__dict__[key] += 1
                room.__dict__[key] -= 1
                                
                await sync_to_async(player1.save)()
                await sync_to_async(room.save)()
                tiles_json = json.dumps(new_tile)
                    
                await self.send_json({
                        'message': 'Tile drawn',
                        'tiles' : tiles_json,
                        'room_id': room_id,
                        'result_type': 'room_id',
                        'status': '202'
                })
            else:
                print("Out of tiles")
                await self.send_json({
                    'message': "out of tiles",
                    'status' : '400'
                })
        except Room.DoesNotExist:
            self.send_json({
                "message': 'Room doesn't exist"
                'status': '404'
            })
            
        except Player.DoesNotExist:
            self.send_json({
                "message': 'Player doesn't exist"
                'status': '404'
            })


    async def discard_tile(self, room_id, content):
        try:
            room_result = await self.filter_room_models(room_id)
            room = await sync_to_async(room_result.first)()
            player_result = await self.filter_player_models(content.get('username'))
            player1 = await sync_to_async(player_result.first)()
            
                        
            await sync_to_async(player1.save)()
            await sync_to_async(room.save)()
            await self.channel_layer.group_send(
                        self.room_name,
                        {
                        "type": "send_json",
                        'message': 'Discarded tile',
                        'player' : content.get('username'),
                        'tile' : content.get('tile'),
                        'room_id': str(room_id),
                        'result_type': 'room_id',
                        'status': '202'
                    })

            
        except Room.DoesNotExist:
            self.send_json({
                "message': 'Room doesn't exist"
                'status': '404'
            })
            return
            
        except Player.DoesNotExist:
            self.send_json({
                "message': 'Player doesn't exist"
                'status': '404'
            })
            return
        
        
        
    '''
    async def discard_tiles(self, room_id, content):
        1. get the room
        2. get the player
        3. check if the player is the current player (by checking content.get('username')
            4. if not, send a message saying that it is not the player's turn
            if yes
            5. check if the player has the tile (almost yes every time if frontend is correct)
                6. if not, send a message saying that the player does not have the tile 
                7. if yea, discard the tile (player.__dict__[tile] -= 1)
                8. broadcast this message to the room
                send_json_message
                {tile, username, room_id, result_type, status}
                
        check whether other players can perform chi or peng or hu.
        for example, if the next player can perform chi, send a message to the next player
        1. if current_player is 1, then next player is 2
        2. check if player2 has the tiles around the tile that player1 discarded 
            (if player1 discarded bamboo1, then check if player2 has bamboo2 and bamboo3)
            (if player1 discarded bamboo5, then check if player2 has bamboo4 and bamboo6 or bamboo6 and bamboo7 or bamboo3 and bamboo4) - fixed range, so O(1) time complexity
        3. prompt a message to player2 saying that player1 discarded a tile and player2 can perform chi
           {
               tile: bamboo5,
               ...
           }
    ''' 
    
    # async def discard_tile(self, content):
    #     '''
    #     username
    #     tile
    #     '''
    #     tile = content.get('tile')
    #     player = content.get('username')
    #     player.__dict__[tile] -= 1
    #     # add it to the players discarded tiles
    #     # player.discarded  somthing something something something 
    #     await self.channel_layer.group_send(
    #         self.room_name,
    #         {
    #             "type": "send_json_message",
    #             "message": "Send tile to ppl",
    #         }
    #     )
    
    '''
    async def chi(self, room_id, content):
        1. get the room
        2. get the player
    '''



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
