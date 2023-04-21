import { useState } from 'react';
import { useSocket } from './SocketProvider';
import '../index.css';

export default function CreateRoomButton() {

  const [roomNum, setRoomNum] = useState(null);
  const socket = useSocket();

  function handleClick() {
    console.log('Create Room Button Clicked');

    socket.addListener(setRoomNum, (room_id) => {
      window.location.href = `/room/${room_id}`
      console.log('new code');
    });

    socket.send(JSON.stringify({
      'type': 'create_room',
    }));

    /* axios.get(`http://localhost:8000/api/create_room/`)
    .then(res => {
      window.location.href = `/room/${res.data.room_id}`;
    })
    .catch(err => {
      console.log(err.response.status);
      alert("Error");
    }); */
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className='button'>Create a Game!</button>
    </div>

  );
}