from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import random
import string
import datetime


def generate_random_host_id():
    length = 6

    while True:
        host_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(host_id=host_id).count() == 0:
            break

    return host_id

# Create your models here.
class Room(models.Model):
    room_id = models.CharField(max_length=8, unique = True) 
    game_mode = models.BooleanField(default=False)
    host_id = models.CharField(max_length=50, default= generate_random_host_id ,unique = True) 

    
class Player(models.Model):
    name = models.CharField("Name", max_length=240)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)


class Tile(models.Model):
    suite = models.CharField("Suite", max_length=10)
    number = models.IntegerField(validators=[MaxValueValidator(10),MinValueValidator(1)])

    def __str__(self):
        return self.suite
    
#TODO: add more fields and function     
# class Game(models.Model):
#     room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
#     is_finished = models.BooleanField(default=False)
    
