from django.db import models
import random
# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

class Room(models.Model):
    room_id = models.CharField(max_length=120)
    
    def _str_(self):
        return self.room_id
    
    def create_room(self):
        room_id = random.randint(100000, 999999)
        self.room_id = room_id
        self.save()
        return room_id
    
class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)

    def __str__(self):
        return self.name