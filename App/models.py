from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import random
import string
import datetime

# def create_tiles():
#     suites = ['Bamboo', 'Character', 'Circle']
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
    
    current_player = models.IntegerField(default=1)
    
    Bamboo1 = models.SmallIntegerField(default=4)
    Bamboo2 = models.SmallIntegerField(default=4)
    Bamboo3 = models.SmallIntegerField(default=4)
    Bamboo4 = models.SmallIntegerField(default=4)
    Bamboo5 = models.SmallIntegerField(default=4)
    Bamboo6 = models.SmallIntegerField(default=4)
    Bamboo7 = models.SmallIntegerField(default=4)
    Bamboo8 = models.SmallIntegerField(default=4)
    Bamboo9 = models.SmallIntegerField(default=4)
    Character1 = models.SmallIntegerField(default=4)
    Character2 = models.SmallIntegerField(default=4)
    Character3 = models.SmallIntegerField(default=4)
    Character4 = models.SmallIntegerField(default=4)
    Character5 = models.SmallIntegerField(default=4)
    Character6 = models.SmallIntegerField(default=4)
    Character7 = models.SmallIntegerField(default=4)
    Character8 = models.SmallIntegerField(default=4)
    Character9 = models.SmallIntegerField(default=4)
    Circle1 = models.SmallIntegerField(default=4)
    Circle2 = models.SmallIntegerField(default=4)
    Circle3 = models.SmallIntegerField(default=4)
    Circle4 = models.SmallIntegerField(default=4)
    Circle5 = models.SmallIntegerField(default=4)
    Circle6 = models.SmallIntegerField(default=4)
    Circle7 = models.SmallIntegerField(default=4)
    Circle8 = models.SmallIntegerField(default=4)
    Circle9 = models.SmallIntegerField(default=4)
    East = models.SmallIntegerField(default=4)
    South = models.SmallIntegerField(default=4)
    West = models.SmallIntegerField(default=4)
    North = models.SmallIntegerField(default=4)
    Red = models.SmallIntegerField(default=4)
    Green = models.SmallIntegerField(default=4)
    White = models.SmallIntegerField(default=4)
   

class Player(models.Model):
    player_id = models.CharField(max_length=50, unique=True)
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='player_set', null=True)
    
    Bamboo1 = models.SmallIntegerField(default=0)
    Bamboo2 = models.SmallIntegerField(default=0)
    Bamboo3 = models.SmallIntegerField(default=0)
    Bamboo4 = models.SmallIntegerField(default=0)
    Bamboo5 = models.SmallIntegerField(default=0)
    Bamboo6 = models.SmallIntegerField(default=0)
    Bamboo7 = models.SmallIntegerField(default=0)
    Bamboo8 = models.SmallIntegerField(default=0)
    Bamboo9 = models.SmallIntegerField(default=0)
    Character1 = models.SmallIntegerField(default=0)
    Character2 = models.SmallIntegerField(default=0)
    Character3 = models.SmallIntegerField(default=0)
    Character4 = models.SmallIntegerField(default=0)
    Character5 = models.SmallIntegerField(default=0)
    Character6 = models.SmallIntegerField(default=0)
    Character7 = models.SmallIntegerField(default=0)
    Character8 = models.SmallIntegerField(default=0)
    Character9 = models.SmallIntegerField(default=0)
    Circle1 = models.SmallIntegerField(default=0)
    Circle2 = models.SmallIntegerField(default=0)
    Circle3 = models.SmallIntegerField(default=0)
    Circle4 = models.SmallIntegerField(default=0)
    Circle5 = models.SmallIntegerField(default=0)
    Circle6 = models.SmallIntegerField(default=0)
    Circle7 = models.SmallIntegerField(default=0)
    Circle8 = models.SmallIntegerField(default=0)
    Circle9 = models.SmallIntegerField(default=0)
    East = models.SmallIntegerField(default=0)
    South = models.SmallIntegerField(default=0)
    West = models.SmallIntegerField(default=0)
    North = models.SmallIntegerField(default=0)
    Red = models.SmallIntegerField(default=0)
    Green = models.SmallIntegerField(default=0)
    White = models.SmallIntegerField(default=0)

    
#TODO: add more fields and function     
# class Game(models.Model):
#     room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
#     is_finished = models.SmallIntegerField(default=0)
    
