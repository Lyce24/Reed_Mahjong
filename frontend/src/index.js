import React from 'react';
import ReactDOM from 'react-dom';


class CreateRoomButton extends React.Component {
    handleClick() {
    // Send request to backend to create a new room
    fetch('/api/create-room')
      .then(response => response.json())
      .then(data => {
        // Redirect user to new room URL
        window.location.href = `/room/${data.roomCode}`;
      });
  }

  render() {
    return (
        <div className="createRoomButton">
            <button onClick={this.handleClick}>Create Room</button>
        </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CreateRoomButton />);

