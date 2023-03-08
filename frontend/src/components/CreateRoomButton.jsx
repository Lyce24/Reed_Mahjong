import React from 'react';

class CreateRoomButton extends React.Component {
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
        <div className="createRoomButton">
            <button onClick={this.handleClick}>Create a Game!</button>
        </div>
    );
  }
}

export default CreateRoomButton;