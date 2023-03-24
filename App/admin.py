from django.contrib import admin
from .models import *


class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_id', 'game_mode', 'Bamboo1', 'Bamboo2', 'Bamboo3', 'Bamboo4', 'Bamboo5', 'Bamboo6', 'Bamboo7', 'Bamboo8', 'Bamboo9', 'Character1', 'Character2', 'Character3', 'Character4', 'Character5', 'Character6', 'Character7', 'Character8', 'Character9', 'Circle1', 'Circle2', 'Circle3', 'Circle4', 'Circle5', 'Circle6', 'Circle7', 'Circle8', 'Circle9', 'East', 'South', 'West', 'North', 'Red', 'Green', 'White')

class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'player_id', 'room', 'Bamboo1', 'Bamboo2', 'Bamboo3', 'Bamboo4', 'Bamboo5', 'Bamboo6', 'Bamboo7', 'Bamboo8', 'Bamboo9', 'Character1', 'Character2', 'Character3', 'Character4', 'Character5', 'Character6', 'Character7', 'Character8', 'Character9', 'Circle1', 'Circle2', 'Circle3', 'Circle4', 'Circle5', 'Circle6', 'Circle7', 'Circle8', 'Circle9', 'East', 'South', 'West', 'North', 'Red', 'Green', 'White' )



# Register your models here.

admin.site.register(Room, RoomAdmin)
admin.site.register(Player, PlayerAdmin)