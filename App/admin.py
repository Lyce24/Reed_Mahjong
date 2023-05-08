from django.contrib import admin
from .models import *


class RoomAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "room_id",
        "game_mode",
        "current_player",
        "zhuangjia",
        "player1",
        "player1",
        "player2",
        "player3",
        "player4",
        "bamboo1",
        "bamboo2",
        "bamboo3",
        "bamboo4",
        "bamboo5",
        "bamboo6",
        "bamboo7",
        "bamboo8",
        "bamboo9",
        "wan1",
        "wan2",
        "wan3",
        "wan4",
        "wan5",
        "wan6",
        "wan7",
        "wan8",
        "wan9",
        "circle1",
        "circle2",
        "circle3",
        "circle4",
        "circle5",
        "circle6",
        "circle7",
        "circle8",
        "circle9",
    )


class PlayerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "player_id",
        "room",
        "bamboo1",
        "bamboo2",
        "bamboo3",
        "bamboo4",
        "bamboo5",
        "bamboo6",
        "bamboo7",
        "bamboo8",
        "bamboo9",
        "wan1",
        "wan2",
        "wan3",
        "wan4",
        "wan5",
        "wan6",
        "wan7",
        "wan8",
        "wan9",
        "circle1",
        "circle2",
        "circle3",
        "circle4",
        "circle5",
        "circle6",
        "circle7",
        "circle8",
        "circle9",
    )


# Register your models here.
admin.site.register(Room, RoomAdmin)
admin.site.register(Player, PlayerAdmin)
