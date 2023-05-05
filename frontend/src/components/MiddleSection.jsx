import Discard from "./Discard";
import RecentDiscard from "./RecentDiscard";
import "../index.css";

export default function MiddleSection({
  discardPiles,
  usernameArray: usernames,
}) {
  return (
    <div className="middleSection">
      <Discard
        orientation="playerDiscard"
        discardPile={discardPiles[0]}
        username={usernames[0]}
      />
      <br />
      <Discard
        orientation="rightDiscard"
        discardPile={discardPiles[1]}
        username={usernames[1]}
      />
      <br />
      <Discard
        orientation="topDiscard"
        discardPile={discardPiles[2]}
        username={usernames[2]}
      />
      <br />
      <Discard
        orientation="leftDiscard"
        discardPile={discardPiles[3]}
        username={usernames[3]}
      />
      <br />
      <RecentDiscard />
    </div>
  );
}
