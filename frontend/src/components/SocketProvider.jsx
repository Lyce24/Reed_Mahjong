import { w3cwebsocket as W3CWebSocket } from 'websocket';

import React, { createContext, useContext, useEffect, useState } from 'react';

// create SocketContext with value = the socket instance, so all components can read this value with useContext(SocketContext)

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const URL = 'ws://localhost:8000/ws/socket-server';
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //const newSocket = new W3CWebSocket(URL);
    const newSocket = new WebSocketInstance(URL);
    setSocket(newSocket);

    //return () => newSocket.close();
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {socket && children} {/* conditionally render the child components only when the socket state is not null. */}
    </SocketContext.Provider>
  );
};

// Create cleaner interface for websocket interface interaction on frontend
class WebSocketInstance {
  constructor(URL) {
    this.socketRef = new W3CWebSocket(URL);
    this.readyState = this.socketRef.readyState;
    this.addCallbacks();
  }

  connect() {
    this.socketRef.onopen = () => {
      console.log('WebSocket connected');
    };
  }

  disconnect() {
    this.socketRef.close();
  }

  addCallbacks() {
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log('WebSocket closed');
    }
  }

  send(setResult, message) {
    if (this.socketRef.readyState === WebSocket.OPEN) {
      this.socketRef.send(message)
    } else {
      console.error('Socket is not connected');
    }

    this.socketRef.onmessage = function(e) {
      if (typeof e.data === 'string') {
          const message = JSON.parse(e.data);
          console.log("Received: ", message);
          if (message.status !== "202"){
            setResult(null);
            return;
          }
          switch (message.result) {
            case "room_id":
              setResult(message.room_id);
              window.location.href = `/room/${message.room_id}`;
              break;
            default:
              break;
          }
        }
    };

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };
  }

  receive(setResult) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === 'string') {
        const message = JSON.parse(e.data);
        console.log("Received: ", message);
        if (message.status !== "202") {
          setResult(null);
          return;
        }
        switch (message.result) {
          case "tile":
            setResult(message.tile);
            break;
          default:
            break;
        }
      }
    }
  };

  onmessage(message) {
    message = JSON.parse(message);
    console.log(message);
    if (message['message'] === 'room_create') {
      console.log(message['room_id']);
    }
  };

  /*   addCallbacks(setMessage) {
      this.socketRef.onmessage = (e) => {
        const message = JSON.parse(e.data);
        setMessage(message);
      };
  
      this.socketRef.onerror = (e) => {
        console.log(e.message);
      };
  
      this.socketRef.onclose = () => {
        console.log('WebSocket closed');
      }
    } */
}

/* export default WebSocketInstance; */