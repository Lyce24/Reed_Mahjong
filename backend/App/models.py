from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import string
import random

def generate_room_id():
    length = 8
    while True:
        room_id = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(room_id=room_id).count() == 0:
            break
        
    return room_id

# Create your models here.
class Room(models.Model):
    room_id = models.CharField(max_length=8, unique = True) 

    def _str_(self):
        return self.room_id
    
class Player(models.Model):
    name = models.CharField("Name", max_length=240)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)


class Tile(models.Model):
    suite = models.CharField("Suite", max_length=10)
    number = models.IntegerField(validators=[MaxValueValidator(10),MinValueValidator(1)])

    def __str__(self):
        return self.suite