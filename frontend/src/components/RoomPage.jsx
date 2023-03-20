import { useParams } from 'react-router-dom';
import Tile from './Tile';

const RoomPage = () => {
    // Get roomid from url
    let { roomid } = useParams();
    
    return (
      <div>
        <h1>Room {roomid} </h1>
        <Tile suite="bamboo" number="10"></Tile>
      </div>
    )
  };
  
export default RoomPage;