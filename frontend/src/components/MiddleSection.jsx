import Discard from "./Discard";
import RecentDiscard from "./RecentDiscard";
import "../index.css";

export default function MiddleSection({ discardPile }) {
  const usernames = Array(4).fill(null);

  return (
    <div className="middleSection">
      <Discard
        orientation="playerDiscard"
        discardPile={discardPile}
        username={usernames[0]}
      />
      <br />
      <Discard
        orientation="leftDiscard"
        discardPile={discardPile}
        username={usernames[1]}
      />
      <br />
      <Discard
        orientation="rightDiscard"
        discardPile={discardPile}
        username={usernames[2]}
      />
      <br />
      <Discard
        orientation="topDiscard"
        discardPile={discardPile}
        username={usernames[3]}
      />
      <br />
      <RecentDiscard />
    </div>
  );
}
