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
   

class Player(models.Model):
    player_id = models.CharField(max_length=50, unique=True)
    
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='player_set', null=True)

    
    Bamboo1 = models.BooleanField(default=False)
    Bamboo2 = models.BooleanField(default=False)
    Bamboo3 = models.BooleanField(default=False)
    Bamboo4 = models.BooleanField(default=False)
    Bamboo5 = models.BooleanField(default=False)
    Bamboo6 = models.BooleanField(default=False)
    Bamboo7 = models.BooleanField(default=False)
    Bamboo8 = models.BooleanField(default=False)
    Bamboo9 = models.BooleanField(default=False)
    Character1 = models.BooleanField(default=False)
    Character2 = models.BooleanField(default=False)
    Character3 = models.BooleanField(default=False)
    Character4 = models.BooleanField(default=False)
    Character5 = models.BooleanField(default=False)
    Character6 = models.BooleanField(default=False)
    Character7 = models.BooleanField(default=False)
    Character8 = models.BooleanField(default=False)
    Character9 = models.BooleanField(default=False)
    Circle1 = models.BooleanField(default=False)
    Circle2 = models.BooleanField(default=False)
    Circle3 = models.BooleanField(default=False)
    Circle4 = models.BooleanField(default=False)
    Circle5 = models.BooleanField(default=False)
    Circle6 = models.BooleanField(default=False)
    Circle7 = models.BooleanField(default=False)
    Circle8 = models.BooleanField(default=False)
    Circle9 = models.BooleanField(default=False)
    East = models.BooleanField(default=False)
    South = models.BooleanField(default=False)
    West = models.BooleanField(default=False)
    North = models.BooleanField(default=False)
    Red = models.BooleanField(default=False)
    Green = models.BooleanField(default=False)
    White = models.BooleanField(default=False)

    
#TODO: add more fields and function     
# class Game(models.Model):
#     room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
#     is_finished = models.BooleanField(default=False)
    
