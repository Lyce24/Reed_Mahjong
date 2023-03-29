from .consumers import *
# from django.conf.urls import url
from django.urls import path

websocket_urlpatterns=[
    # url(r'^ws/room/(?P<room_id>\w+)/$', AppConsumer.as_asgi()),
    path('ws/room/<room_id>/', AppConsumer.as_asgi()),
]