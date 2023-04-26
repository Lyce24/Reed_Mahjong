import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function JoinRoom(props) {
  // const [roomNum, setRoomNum] = useState(0);
  //const socket = useSocket();
  // const navigate = useNavigate();

  // Set up room listener upon initial render
  /* useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, [socket, navigate]); */

  // Redirect to room when user clicks button if roomNum is valid
  function handleSubmit(e) {
    e.preventDefault(); // prevent form submission
    props.socket.send({
      type: "join_room",
      room_id: props.roomNum,
    });
  }

  return (
    <div className="joinRoom">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Room Code: </span>
          <input
            type="text"
            value={props.roomNum}
            onChange={(e) => props.setRoomNum(e.target.value)}
            maxLength={8}
            minLength={8}
          />
        </label>
        <input type="submit" value="Submit" className="button" />
      </form>
    </div>
  );
}
