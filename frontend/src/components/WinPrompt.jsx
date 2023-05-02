import "../index.css";

export default function WinPrompt(props) {
  return (
    <div className="chiPrompt">
      <button type="button" onClick={props.handleChiAccept} className="button">
        You can Win! Click to accept
      </button>
      <button type="button" onClick={props.handleChiReject} className="button">
        You can Win! Click to reject
      </button>
    </div>
  );
}
