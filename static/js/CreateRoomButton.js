import React from 'react';

function CreateRoomButton() {
  function handleClick() {
    // Send request to backend to create a new room
    fetch('/api/create-room')
      .then(response => response.json())
      .then(data => {
        // Redirect user to new room URL
        window.location.href = `/room/${data.roomCode}`;
      });
  }

  return (
    <button onClick={handleClick}>
      Create a room!
    </button>
  );
}

export default CreateRoomButton;
