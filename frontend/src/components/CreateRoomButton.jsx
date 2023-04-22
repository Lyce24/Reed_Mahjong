import { useState } from 'react';
import { useSocket } from './SocketProvider';
//import { useUsername } from './UsernameProvider';
import '../index.css';

export default function CreateRoomButton() {

  const [roomNum, setRoomNum] = useState(null);
  const socket = useSocket();
  //const username = useUsername();

  function handleClick() {
    console.log('Create Room Button Clicked');
    //console.log("username", username)

    socket.send(JSON.stringify({
      'type': 'create_room',
    }));
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className='button'>Create a Game!</button>
    </div>

  );
}