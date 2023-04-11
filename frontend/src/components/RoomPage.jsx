import { useParams } from 'react-router-dom';
import GameBoard from './GameBoard';


export default function RoomPage() {
  // Get roomid from url
  let { roomid } = useParams();

  return (
    <div className='page roomPage'>
      <h1>Room {roomid} </h1>
      <GameBoard />
    </div>
  );
}
