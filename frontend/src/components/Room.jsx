import { useParams } from 'react-router-dom';

const Room = () => {
    // Get roomid from url
    let { roomid } = useParams();
    
    return (
      <div>
        <h1>Room {roomid}</h1>
      </div>
    )
  };
  
export default Room;