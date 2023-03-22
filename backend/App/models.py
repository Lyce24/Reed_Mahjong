from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.
class Room(models.Model):
    room_id = models.CharField(max_length=8) 

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