import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import "../index.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoomButton(props) {
  //const [roomNum, setRoomNum] = useState(null);
  //const socket = useSocket();
  //const navigate = useNavigate();

  // Set up room listener upon initial render
  /* useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, [socket, navigate]); */

  // Redirect to random room when user clicks button
  function handleClick() {
    console.log("Create Room Button Clicked");
    props.socket.send({
      type: "create_room",
    });
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className="button">
        Create a Game!
      </button>
    </div>
  );
}
