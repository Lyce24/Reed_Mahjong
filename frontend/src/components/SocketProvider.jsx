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
    //newSocket.addListener();
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
    this.addListener();
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
  // Add listener to display general messages from backend in console
  //! Not working for some reason, not super important for now
  addListener() {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        console.log("Received unfiltered: ", message);
        if (message.status !== "202") {
          return;
        }
        console.log("unsuccesful message");
      }
    };
  }

  // Add listner to set room id and navigate to room page
  // Ideally, it would be added only once, when user clicks create room button or the join room button
  addRoomListener(setRoomNum, navigate) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        //console.log("Received unfiltered: ", message);
        // only proceed if message is about create room
        if (message.result_type === "room_id") {
          console.log("Received: ", message);
          if (message.status !== "202") {
            console.log("create room error");
            return;
          }
          setRoomNum(message.room_id);
          navigate(`/room/${message.room_id}`);
        }
      }
    };
  }

  // Add listener to set tile that has been drawn
  addDrawListener(setTile) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        // only proceed if message is about draw
        if (message.result_type === "draw") {
          console.log("Received: ", message);
          if (message.status !== "202") {
            setTile(null);
            return;
          }
          // Tile has suite, number, index, key params
          // Backend should send suite and number
          // TODO: generate unique key for tile, use null for index, append to backend response
          setTile(message.tile);
        }
      }
    };
  }

  // Add listener to display tile that has been discarded (by any player)
  addDiscardListener(setDiscardPile) {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        // only proceed if message is about discard
        if (message.result_type === "discard") {
          console.log("Received: ", message);
          if (message.status !== "202") {
            console.log("discard error");
            return;
          }
          setDiscardPile(message.tile);
        }
      }
    };
  }

  // Abandoned
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
