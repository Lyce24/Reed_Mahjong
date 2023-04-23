from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import random
import string
import datetime

# def create_tiles():
#     suites = ['bamboo', 'wan', 'circle']
#     honors = ['East', 'South', 'West', 'North', 'Red', 'Green', 'White']
#     tiles = []
#     for suite in suites:
#         for i in range(1, 10):
#             tiles.append(suite + str(i))
#     for honor in honors:
#         tiles.append(honor)
#     return tiles

    # add player 1, player 2, player 3, player 4 (default = "")
    # each time a player joins, add the player to the room
    # when a player leaves, remove the player from the room
    # check if the room is full, if it is pop a notification
    # if the room is full and game_mode is true, start the game

 
class Room(models.Model):
    room_id = models.CharField(max_length=8, unique = True) 
    game_mode = models.BooleanField(default=False)
    
    player1 = models.CharField(max_length=50, default="")
    player2 = models.CharField(max_length=50, default="")
    player3 = models.CharField(max_length=50, default="")
    player4 = models.CharField(max_length=50, default="")
    
    current_player = models.CharField(max_length = 50, default= "")
    zhuangjia = models.CharField(max_length = 50, default= "")
    
    bamboo1 = models.SmallIntegerField(default=4)
    bamboo2 = models.SmallIntegerField(default=4)
    bamboo3 = models.SmallIntegerField(default=4)
    bamboo4 = models.SmallIntegerField(default=4)
    bamboo5 = models.SmallIntegerField(default=4)
    bamboo6 = models.SmallIntegerField(default=4)
    bamboo7 = models.SmallIntegerField(default=4)
    bamboo8 = models.SmallIntegerField(default=4)
    bamboo9 = models.SmallIntegerField(default=4)
    wan1 = models.SmallIntegerField(default=4)
    wan2 = models.SmallIntegerField(default=4)
    wan3 = models.SmallIntegerField(default=4)
    wan4 = models.SmallIntegerField(default=4)
    wan5 = models.SmallIntegerField(default=4)
    wan6 = models.SmallIntegerField(default=4)
    wan7 = models.SmallIntegerField(default=4)
    wan8 = models.SmallIntegerField(default=4)
    wan9 = models.SmallIntegerField(default=4)
    circle1 = models.SmallIntegerField(default=4)
    circle2 = models.SmallIntegerField(default=4)
    circle3 = models.SmallIntegerField(default=4)
    circle4 = models.SmallIntegerField(default=4)
    circle5 = models.SmallIntegerField(default=4)
    circle6 = models.SmallIntegerField(default=4)
    circle7 = models.SmallIntegerField(default=4)
    circle8 = models.SmallIntegerField(default=4)
    circle9 = models.SmallIntegerField(default=4)

   

class Player(models.Model):
    player_id = models.CharField(max_length=50, unique=True)
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='player_set', null=True)
    
    bamboo1 = models.SmallIntegerField(default=0)
    bamboo2 = models.SmallIntegerField(default=0)
    bamboo3 = models.SmallIntegerField(default=0)
    bamboo4 = models.SmallIntegerField(default=0)
    bamboo5 = models.SmallIntegerField(default=0)
    bamboo6 = models.SmallIntegerField(default=0)
    bamboo7 = models.SmallIntegerField(default=0)
    bamboo8 = models.SmallIntegerField(default=0)
    bamboo9 = models.SmallIntegerField(default=0)
    wan1 = models.SmallIntegerField(default=0)
    wan2 = models.SmallIntegerField(default=0)
    wan3 = models.SmallIntegerField(default=0)
    wan4 = models.SmallIntegerField(default=0)
    wan5 = models.SmallIntegerField(default=0)
    wan6 = models.SmallIntegerField(default=0)
    wan7 = models.SmallIntegerField(default=0)
    wan8 = models.SmallIntegerField(default=0)
    wan9 = models.SmallIntegerField(default=0)
    circle1 = models.SmallIntegerField(default=0)
    circle2 = models.SmallIntegerField(default=0)
    circle3 = models.SmallIntegerField(default=0)
    circle4 = models.SmallIntegerField(default=0)
    circle5 = models.SmallIntegerField(default=0)
    circle6 = models.SmallIntegerField(default=0)
    circle7 = models.SmallIntegerField(default=0)
    circle8 = models.SmallIntegerField(default=0)
    circle9 = models.SmallIntegerField(default=0)


    
#TODO: add more fields and function     
# class Game(models.Model):
#     room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
#     is_finished = models.SmallIntegerField(default=0)
    
