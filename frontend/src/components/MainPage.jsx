import CreateRoomButton from "./CreateRoomButton";
import JoinRoom from "./JoinRoom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

export default function MainPage() {
  // const socket = null;
  //const roomNum = null;
  //const setRoomNum = () => null;
  const socket = useSocket();
  const navigate = useNavigate();
  const [roomNum, setRoomNum] = useState(0);

  // Setup room listener when Main Page is mounted
  useEffect(() => {
    socket.addRoomListener(setRoomNum, navigate);
  }, [socket, navigate]);

  return (
    <div className="page mainPage">
      <h3>Welcome to Reed Mahjong!</h3>
      <hr></hr>
      <CreateRoomButton socket={socket} />
      <br />
      <JoinRoom socket={socket} roomNum={roomNum} setRoomNum={setRoomNum} />
    </div>
  );
}
