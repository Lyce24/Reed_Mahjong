import axios from 'axios';
import { useState } from 'react';
import { useSocket } from './SocketProvider';
import '../index.css';

export default function CreateRoomButton() {

  const [roomNum, setRoomNum] = useState(null);
  const socket = useSocket();

  function handleClick() {
    console.log('Clicked');

    socket.send({
      'request': 'createRoom',
      'result': 'roomNum',
      'roomNum': `000`, //* will get from backend
      'status': '202', //* will get from backend
    }, setRoomNum);

    if (roomNum !== null){
      window.location.href = `/room/${roomNum}`;
    } else {
      console.log('Error');
    }

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