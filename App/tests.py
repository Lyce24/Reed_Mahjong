from django.test import TestCase
from channels.testing import WebsocketCommunicator
from channels.routing import ProtocolTypeRouter, URLRouter
from App.consumers import *
from App.routing import websocket_urlpatterns

# Create your tests here.
"""
More info: https://channels.readthedocs.io/en/stable/topics/testing.html
Run using: python manage.py test App.tests.MyTests
"""

class MyTests(TestCase):
    async def test_my_consumer(self):
        application = ProtocolTypeRouter({
            "websocket": URLRouter(websocket_urlpatterns),
        })
        communicator = WebsocketCommunicator(application, "/ws/room/46024836/")

        # Test WebSocket connection
        connected, _ = await communicator.connect()
        assert connected

        # Send test message to the consumer
        message = {'type': 'placeholder'}
        await communicator.send_json_to(message)

        # Receive response from consumer
        response = await communicator.receive_json_from()
        # Check that response is expected
        assert response == {'echo': message} # since receive_json just echoes currently

        # Close WebSocket connection
        await communicator.disconnect()