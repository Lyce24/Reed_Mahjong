import React from 'react';
import '../index.css';

export default function CreateRoomButton() {

  function handleClick() {
    // TODO: Send request to backend to create a new room
    console.log('Clicked');
    fetch('http://localhost:8000/create_room/')
      .then(response => response.json())
      .then(data => {
        // Redirect user to new room URL
        window.location.href = `/room/${data.room_id}`;
      });
  }

  return (
    <div className="createRoomButton">
      <button type="button" onClick={handleClick} className='button'>Create a Game!</button>
    </div>

  );
}