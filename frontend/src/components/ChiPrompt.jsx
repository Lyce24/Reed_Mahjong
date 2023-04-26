import "../index.css";

export default function ChiPrompt(props) {
  return (
    <div className="chiPrompt">
      <button type="button" onClick={props.handleChiAccept} className="button">
        You can Chi. Click to accept
      </button>
      <button type="button" onClick={props.handleChiReject} className="button">
        You can Chi. Click to reject
      </button>
    </div>
  );
}
