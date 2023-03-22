from django.dispatch import receiver    
from django.db.models.signals import post_save,post_delete
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from .models import Room

channel_layer = get_channel_layer()



@receiver(post_save,sender=Room)
def create_room_signal(sender, instance, created, *args, **kwargs):
    ins_room_id = instance.room_id
    ins_id = instance.id 

    if created:
        async_to_sync(channel_layer.group_send)(
        f'online_bingo_room',
            {
                "type":"websocket_room_added",
                "command":"room_added",
                "room_name":ins_room_id,
                "room_id":ins_id
            }
        )


@receiver(post_delete,sender=Room)
def delete_room_signal(sender, instance, *args, **kwargs):
    print(instance.room_id ,'was deleted')
    ins_room_id = instance.room_id
    ins_id = instance.id 
    async_to_sync(channel_layer.group_send)(
    f'online_bingo_room',
        {
            "type":"websocket_room_deleted",
            "command":"room_deleted",
            "room_name":ins_room_id,
            "room_id":ins_id
        }
    )