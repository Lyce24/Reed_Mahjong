import "../index.css";

export default function PengPrompt(props) {
  return (
    <div className="pengPrompt">
      <button type="button" onClick={props.onClick} className="button">
        Peng?
      </button>
    </div>
  );
}
