import React from 'react';

class JoinRoomButton extends React.Component {
    handleClick() {
    // Send request to backend to create a new room
    console.log('Clicked');
    window.location.href = "/room/000"
    console.log('Navigated');
    /* fetch('/api/create-room')
      .then(response => response.json())
      .then(data => {
        // Redirect user to new room URL
        window.location.href = `/room/${data.roomCode}`;
        //window.location.href = "/room/000"
        console.log('Navigated');
      }); */
  }

  render() {
    return (
        <div className="joinRoomButton">
            <label htmlFor="roomCode">Room Code: </label>
            <input type="number" id='roomCode' />
            <button onClick={this.handleClick}>Join a Game!</button>
        </div>
    );
  }
}

export default JoinRoomButton;