import "../index.css";

export default function DiscardButton(props) {
  return (
    <div className="discardButton">
      <button type="button" onClick={props.onClick} className="button">
        Discard!
      </button>
    </div>
  );
}
