import { useParams } from 'react-router-dom';
import GameBoard from './GameBoard';


const RoomPage = () => {
    // Get roomid from url
    let { roomid } = useParams();
    
    return (
      <div>
        <h1>Room {roomid} </h1>
        <GameBoard/>
      </div>
    )
  };
  
export default RoomPage;