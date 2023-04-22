import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUsername } from "./UsernameProvider";

// create SocketContext with value = the socket instance
// so all components can read this value with useContext(SocketContext)
const SocketContext = createContext();

// useSocket is a custom hook
// we can use it in any component to get the socket instance
export const useSocket = () => useContext(SocketContext);

// SocketProvider is a component that wraps all other components
// so all components can access the context value, which is the socket instance
export const SocketProvider = ({ children }) => {
  const URL = "ws://localhost:8000/ws/socket-server";
  const [socket, setSocket] = useState(null);

  const username = useUsername();

  useEffect(() => {
    // initialize socket instance
    const newSocket = new WebSocketInstance(URL, username);
    newSocket.addListener();
    setSocket(newSocket);
    // this is the cleanup function, it will be called when the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {socket && children}
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

  // used once during initialization
  addCallbacks() {
    this.socketRef.onerror = (e) => {
      console.log(e.message);
    };

    this.socketRef.onclose = () => {
      console.log("WebSocket closed");
    };
  }

  // Send JSON object to backend
  send(message) {
    if (this.socketRef.readyState === WebSocket.OPEN) {
      // Append username to the message JSON being sent
      const newmessage = {
        ...message,
        username: this.username,
      };
      console.log("send message", newmessage);
      this.socketRef.send(JSON.stringify(newmessage));
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
            window.location.href = `/room/${message.room_id}`;
            break;
          default:
            break;
        }
      }
    };
  }

  addDrawListener(setResult) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        console.log("Received: ", message);
        if (message.status !== "202") {
          setResult(null);
          return;
        }
        if (message.result_type === "draw") {
          setResult(message);
        }
      }
    };
  }

  addDiscardListener(callback) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        console.log("Received: ", message);
        if (message.status !== "202") {
          setResult(null);
          return;
        }
        if (message.result_type === "discard") {
          callback();
        }
      }
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
