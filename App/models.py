from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import random
import string
import datetime


# Create your models here.
class Room(models.Model):
    room_id = models.CharField(max_length=8, unique = True) 
    game_mode = models.BooleanField(default=False)

    # add player 1, player 2, player 3, player 4 (default = "")
    # each time a player joins, add the player to the room
    # when a player leaves, remove the player from the room
    # check if the room is full, if it is pop a notification
    # if the room is full and game_mode is true, start the game

    player_1 = models.CharField(max_length=50, default= '' ) 
    player_2 = models.CharField(max_length=50, default= '' ) 
    player_3 = models.CharField(max_length=50, default= '' ) 
    player_4 = models.CharField(max_length=50, default= '' ) 
    
class Player(models.Model):
    name = models.CharField("Name", max_length=240)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)


class Tile(models.Model):
    suite = models.CharField("Suite", max_length=10)
    number = models.IntegerField(validators=[MaxValueValidator(10),MinValueValidator(1)])

    def __str__(self):
        return self.suite
    
# TODO: Tile
'''
Try to find a nice data structure to represent the tiles for each player
'''
    
#TODO: add more fields and function     
# class Game(models.Model):
#     room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
#     is_finished = models.BooleanField(default=False)
    
