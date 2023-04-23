import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import "../index.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateRoomButton() {
  const [roomNum, setRoomNum] = useState(null);
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, []);

  function handleClick() {
    console.log("Create Room Button Clicked");
    socket.send({
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
