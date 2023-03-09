import React from 'react';
import axios from 'axios';

class JoinRoomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates state.value to what user inputs
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Posts state.value when user clicks button
  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted',  JSON.stringify(this.state));

    axios.get(`http://localhost:8000/api/todos/`)
      .then(res => {
        console.log(res.data);
      });
    /* fetch('/api/get-room', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = `/room/${data.roomCode}`;
        }) */
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Room Code:
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default JoinRoomButton;