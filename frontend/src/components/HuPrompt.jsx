import "../index.css";

export default function HuPrompt(props) {
  return (
    <div className="huPrompt">
      <button type="button" onClick={props.handleChiAccept} className="button">
        You can perform hu! Click to accept
      </button>
      <button type="button" onClick={props.handleChiReject} className="button">
        You can perform hu! Click to reject
      </button>
    </div>
  );
}
