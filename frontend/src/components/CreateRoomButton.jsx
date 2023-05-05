import "../index.css";
import React from "react";

export default function CreateRoomButton(props) {
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
