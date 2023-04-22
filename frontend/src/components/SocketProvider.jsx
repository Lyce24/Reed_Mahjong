import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUsername } from "./UsernameProvider";

// create SocketContext with value = the socket instance, so all components can read this value with useContext(SocketContext)

const SocketContext = createContext();

// useSocket is a custom hook, so we can use it in any component to get the socket instance
export const useSocket = () => useContext(SocketContext);

// SocketProvider is a component that wraps all other components, so all components can access the socket instance
export const SocketProvider = ({ children }) => {
  const URL = "ws://localhost:8000/ws/socket-server";
  const [socket, setSocket] = useState(null);

  const username = useUsername();

  useEffect(() => {
    //const newSocket = new W3CWebSocket(URL);
    
    const newSocket = new WebSocketInstance(URL, username);
    newSocket.addListener();
    setSocket(newSocket);
    //return () => newSocket.close();
    // this is the cleanup function, it will be called when the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {socket && children}{" "}
      {/* conditionally render the child components only when the socket state is not null. */}
    </SocketContext.Provider>
  );
};


// Create cleaner interface for websocket interface interaction on frontend
class WebSocketInstance {
  constructor(URL, username) {
    this.socketRef = new W3CWebSocket(URL);
    this.readyState = this.socketRef.readyState;
    this.username = username;
    this.addCallbacks();
  }

  // never used
  connect() {
    this.socketRef.onopen = () => {
      console.log("WebSocket connected");
    };
  }

  // never used
  disconnect() {
    this.socketRef.close();
  }

  // never used
  addCallbacks() {
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed");
    };
  }

  // Send JSON to backend
  send(message) {
    if (this.socketRef.readyState === WebSocket.OPEN) {
      console.log('send message w username', this.username)
      this.socketRef.send(message);
    } else {
      console.error("Socket is not connected");
    }
  }

  /* Backend response JSON structure: 
  status
  result
  */
  // Add onmessage listener
  addListener() {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        console.log("Received: ", message);
        if (message.status !== "202") {
          return;
        }
        switch (message.result_type) {
          case "room_id":
            // window.location.href = `/room/${message.room_id}`;
            break;
          default:
            break;
        }
      }
    };
    /* this.socketRef.onmessage = function (e) {
      // if the type of e.data is not string, it's a blob, which is the image
      if (typeof e.data !== "string") {
        console.log(`${e.data} is not a string`);
        return;
      }
      const message = JSON.parse(e.data);
      console.log("Received: ", message);
      if (message.status !== "202") {
        setResult(null);
        return;
      } else {
        setResult(message.result);
        callback(message.result);
      }
    }; */

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };
  }
  // Don't send anything, just specify what behavior you want when receive backend response
  receive(setResult) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
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
    };
  }
}
