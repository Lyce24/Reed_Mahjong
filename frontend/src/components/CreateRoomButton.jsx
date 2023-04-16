import { useState } from 'react';
import { useSocket } from './SocketProvider';
import '../index.css';

export default function CreateRoomButton() {

  const [roomNum, setRoomNum] = useState(null);
  const socket = useSocket();

  function handleClick() {
    console.log('Clicked');

    socket.send({
      'type': 'create_room',
    }, setRoomNum);
    
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className='button'>Create a Game!</button>
    </div>

  );
}