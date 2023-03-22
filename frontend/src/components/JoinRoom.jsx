import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../index.css';

export default function JoinRoom() {
  const [roomNum, setRoomNum] = useState(0);

  // Posts roomNum when user clicks button
  function handleSubmit() {
    // preventDefault();
    console.log('Submitted', JSON.stringify(roomNum));

    axios.get(`http://localhost:8000/api/todos/`)
      .then(res => {
        console.log(res.data);
      });
    /* fetch('/api/get-room', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(.state)
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = `/room/${data.roomCode}`;
        }) */
  }

  return (
    <div className='joinRoom'>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Room Code: </span>
          <input type="number" value={roomNum} onChange={e => setRoomNum(e.target.value)} />
        </label>
        <input type="submit" value="Submit" className='button' />
      </form>
    </div>

  );
}
