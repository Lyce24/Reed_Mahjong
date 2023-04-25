import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUsername } from "./UsernameProvider";
import { nanoid } from "nanoid";

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
    setSocket(newSocket);

    // this is the cleanup function, it will be called when the component unmounts (ideally never)
    return () => newSocket.disconnect();
  }, [username]);

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
  status: "202" or "400"
  result_type: "room_id", "start_tiles", "draw_tile" etc
  */
  // Add default listener to display messages from backend in console
  //* Not necessary to use this
  addListener() {
    this.socketRef.onmessage = function (e) {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        console.log("Received message from backend", message.result_type);

        // only proceed if message is a notification
        if (
          message.result_type === "notification" ||
          message.result_type === "placeholder" ||
          message.status === "400"
        ) {
          console.log("Received from general listener: ", message);
        }
      }
    };
  }

  // Add listner to set room id and navigate to room page
  // Ideally, it would be added only once in main page component
  addRoomListener(setRoomNum, navigate) {
    this.socketRef.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);

        // only proceed if message is about create room
        if (message.result_type === "room_id") {
          console.log("Room listener: ", message);

          if (message.status !== "202") {
            console.log("create room error");
            return;
          }

          setRoomNum(message.room_id);
          navigate(`/room/${message.room_id}`);
        }
      }
    });
  }

  // Broadcasted message, so need to check if message is for this player
  addStartTileListener(setHand, username, compareTile) {
    this.socketRef.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);

        // only proceed if message is about start tiles
        if (message.result_type === "start_tiles") {
          console.log("Player listener: ", message);
          // only proceed if message is for this player, and message is successful
          if (message.player === username && message.status === "202") {
            console.log("message is for this player", username);
            let hand = message.tiles;
            // add index and key to each tile
            hand.forEach((tile) => {
              tile.index = null;
              tile.key = nanoid();
            });
            // sort hand by suite and number, reindex
            hand.sort(compareTile);
            hand.forEach((tile, index) => {
              tile.index = index;
            });
            console.log("received hand", hand);
            setHand(hand);
          } else if (message.player === username) {
            console.log("message is for this player, but error");
            setHand(null);
          }
        }
      }
    });
  }

  // Add listener to set tile that has been drawn
  // Broadcasted message, so need to check if message is for this player
  addDrawListener(setTile, username) {
    this.socketRef.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);

        // only proceed if message is about draw
        if (message.result_type === "draw_tile") {
          console.log("Draw listener: ", message);
          // only proceed if message if for this player
          if (message.player === username && message.status === "202") {
            console.log("message is for this player", username);
            const tile = message.tile;
            // backend only sends suite and number
            // generate unique key for tile, use null for index, append to backend response
            const new_tile = {
              ...tile,
              index: null,
              key: nanoid(),
            };
            setTile(new_tile);
          } else if (message.player === username) {
            console.log("message is for this player, but error");
            setTile(null);
          }
        }
      }
    });
  }

  // Broadcasted message, but all playes need to receive, so no need to check if message is for this player
  // Add listener to display tile that has been discarded (by any player)
  addDiscardListener(setDiscardPile) {
    this.socketRef.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);

        // only proceed if message is about discard
        if (message.result_type === "discard_tile") {
          console.log("Discard listener: ", message);

          if (message.status !== "202") {
            console.log("discard error");
            return;
          }
          console.log("Received discard tile", message.tile);
          //setDiscardPile(message.tile);
        }
      }
    });
  }

  // Broadcasted message, so need to check if message is for this player
  // Add listener to display peng prompt from backend
  addPengListener(setPengPrompt, setPengTile, username) {
    this.socketRef.addEventListener("message", (e) => {
      if (typeof e.data === "string") {
        const message = JSON.parse(e.data);
        if (message.result_type == "peng_prompt") {
          console.log("peng listener", message);
          // only proceed if message is for this player, and message is successful
          if (message.player === username && message.status === "202") {
            console.log("message is for this player", username);
            setPengPrompt(true);
            const tile = message.tile;
            // backend only sends suite and number
            // generate unique key for tile, use null for index, append to backend response
            const new_tile = {
              ...tile,
              index: null,
              key: nanoid(),
            };
            setPengTile(new_tile);
          } else if (message.player === username) {
            console.log("message is for this player, but error");
            setPengPrompt(false);
          }
        }
      }
    });
  }

  // Abandoned code
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
