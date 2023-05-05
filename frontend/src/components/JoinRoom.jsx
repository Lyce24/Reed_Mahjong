import "../index.css";

export default function JoinRoom(props) {
  // Redirect to room when user clicks button if roomNum is valid
  function handleSubmit(e) {
    e.preventDefault(); // prevent form submission
    props.socket.send({
      type: "join_room",
      room_id: props.roomNum,
    });
  }

  return (
    <div className="joinRoom">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Room Code: </span>
          <input
            type="text"
            value={props.roomNum}
            onChange={(e) => props.setRoomNum(e.target.value)}
            maxLength={8}
            minLength={8}
            pattern="[0-9]{8}"
          />
        </label>
        <input type="submit" value="Submit" className="button" />
      </form>
    </div>
  );
}
