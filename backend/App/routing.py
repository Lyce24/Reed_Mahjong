from .consumers import *
from django.conf.urls import url

websocket_urlpatterns=[
    url(r'^ws/rooms/(?P<room_id>\w+)/$', AppConsumer.as_asgi()),
]