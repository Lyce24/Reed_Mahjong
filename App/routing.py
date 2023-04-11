from .consumers import *
# from django.conf.urls import url
from django.urls import path, re_path

websocket_urlpatterns=[
    # url(r'^ws/room/(?P<room_id>\w+)/$', AppConsumer.as_asgi()),
    # path('ws', AppConsumer.as_asgi()),
    re_path(r'ws/socket-server/', AppConsumer.as_asgi())
]