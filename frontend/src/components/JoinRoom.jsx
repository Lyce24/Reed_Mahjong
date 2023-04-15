import axios from 'axios';
import { useState } from 'react';
import { useSocket } from './SocketProvider';
import '../index.css';

export default function JoinRoom() {
  const [roomNum, setRoomNum] = useState(0);
  const socket = useSocket();

  // Redirect to room when user clicks button if roomNum if valid 
  function handleSubmit(e) {
    e.preventDefault(); // prevent form submission
    
    socket.send({
      'request': 'joinRoom',
      'result': 'roomNum',
      'roomNum': `000`, //* will get from backend
      'status': '202', //* will get from backend
    }, setRoomNum);

    if (roomNum !== null){
      window.location.href = `/room/${roomNum}`;
    } else {
      console.log('Room number invalid');
    }

/*     axios.post(`http://localhost:8000/api/join_room/`, {room_id: roomNum})
      .then(res => {
        if (res.status === 202){
          window.location.href = `/room/${roomNum}`;
        }
      })
      .catch(err => {
        console.log(err.response);
      });  */
  }

  return (
    <div className='joinRoom'>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Room Code: </span>
          <input type="text" value={roomNum} onChange={e => setRoomNum(e.target.value)} maxLength={8} minLength={8} />
        </label>
        <input type="submit" value="Submit" className='button' />
      </form>
    </div>

  );
}
