import { useParams } from 'react-router-dom';

const RoomPage = () => {
    // Get roomid from url
    let { roomid } = useParams();
    
    return (
      <div>
        <h1>Room {roomid}</h1>
      </div>
    )
  };
  
export default RoomPage;