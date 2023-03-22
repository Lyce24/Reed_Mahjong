import React from 'react';
import axios from 'axios';
import '../index.css';

export default function CreateRoomButton() {

  function handleClick() {
    console.log('Clicked');
    axios.get(`http://localhost:8000/create_room/`)
    .then(res => {
      window.location.href = `/room/${res.data.room_id}`;
    })
    .catch(err => {
      console.log(err.response.status);
      alert("Error");
    });
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className='button'>Create a Game!</button>
    </div>

  );
}