import CreateRoomButton from './CreateRoomButton';
import JoinRoom from './JoinRoom';
//import WebSocketInstance from './WebSocketInstance';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useState, useEffect } from 'react';

export default function MainPage() {
    /* const WebSocket = () => {
        const [message, setMessage] = useState('');
      
        useEffect(() => {
          WebSocketInstance.connect();
          WebSocketInstance.addCallbacks(setMessage);
          return () => {
            WebSocketInstance.disconnect();
          };
        }, []);
      
        return (
          <div>
            <p>Last message: {message}</p>
          </div>
        );
      }; */

      const URL = 'ws://localhost:8000/ws/room/000/';
        var socket = new W3CWebSocket(URL);
        socket.onopen = () =>{
            console.log("WebSocket Client Connected");
            socket.send(JSON.stringify({
                'type': 'placeholder',
                'message': 'hi',
            }))
        }
        socket.onmessage = function(e) {
            if (typeof e.data === 'string') {
                console.log("Received: '" + e.data + "'");
            }
        };
        
    return (
        <div className='page mainPage'>
            <h3>Welcome to Reed Mahjong!</h3>
            <hr></hr>
            <CreateRoomButton />
            <br />
            <JoinRoom />
        </div>
    );
}