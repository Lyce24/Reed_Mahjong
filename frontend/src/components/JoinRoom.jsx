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
      'type': 'join_room',
      'room_id': roomNum,
    }, setRoomNum);
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
