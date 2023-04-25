import "../index.css";

export default function PengPrompt(props) {
  return (
    <div className="pengPrompt">
      <button type="button" onClick={props.handlePengAccept} className="button">
        You can Peng. Click to accept
      </button>
      <button type="button" onClick={props.handlePengReject} className="button">
        You can Peng. Click to reject
      </button>
    </div>
  );
}
