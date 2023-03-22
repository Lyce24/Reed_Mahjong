import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../index.css';

export default function JoinRoom() {
  const [roomNum, setRoomNum] = useState(0);

  // Redirect to room when user clicks button if roomNum if valid 
  function handleSubmit(e) {
    e.preventDefault(); // prevent form submission

    axios.get(`http://localhost:8000/room/${roomNum}`)
      .then(res => {
        if (res.status == "200"){
          window.location.href = `/room/${res.data.room_id}`;
        }
      })
      .catch(err => {
        console.log(err.response.status);
        alert("Room number doesn't exist");
      });
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
