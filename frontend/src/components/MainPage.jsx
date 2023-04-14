import CreateRoomButton from './CreateRoomButton';
import JoinRoom from './JoinRoom';
//import WebSocketInstance from './WebSocketInstance';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useState, useEffect } from 'react';
import { useSocket } from './SocketProvider';

export default function MainPage() {
        
    const socket = useSocket();
    //console.log('state', socket.state());
    //setTimeout(()=>{console.log('state', socket.state());}, 1000)
    socket.onopen = () =>{
        console.log("WebSocket Client Connected");
        socket.send(JSON.stringify({
            'type': 'placeholder',
            'message': 'hi',
        }))
    }
    socket.onmessage = function(e) {
        if (typeof e.data === 'string') {
            const message = JSON.parse(`${e.data}`);
            console.log("Received: ", message);
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