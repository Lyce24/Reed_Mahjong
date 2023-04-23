import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [roomNum, setRoomNum] = useState(0);
  const socket = useSocket();
  const navigate = useNavigate();

  // Set up room listener upon initial render
  useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, [socket, navigate]);

  // Redirect to room when user clicks button if roomNum is valid
  function handleSubmit(e) {
    e.preventDefault(); // prevent form submission
    socket.send({
      type: "join_room",
      room_id: roomNum,
    });
  }

  return (
    <div className="joinRoom">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Room Code: </span>
          <input
            type="text"
            value={roomNum}
            onChange={(e) => setRoomNum(e.target.value)}
            maxLength={8}
            minLength={8}
          />
        </label>
        <input type="submit" value="Submit" className="button" />
      </form>
    </div>
  );
}
