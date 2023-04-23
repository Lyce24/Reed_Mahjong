import Discard from "./Discard";
import RecentDiscard from "./RecentDiscard";
import "../index.css";
import { useState } from "react";
import { useSocket } from "./SocketProvider";

export default function MiddleSection() {
  const socket = useSocket();

  const [discardPile, setDiscardPile] = useState(null);

  // Set up discard listener upon initial render of middle section
  socket.addDiscardListener(setDiscardPile);

  return (
    <div className="middleSection">
      <Discard orientation="playerDiscard" />
      <br />
      <Discard orientation="leftDiscard" />
      <br />
      <Discard orientation="rightDiscard" />
      <br />
      <Discard orientation="topDiscard" />
      <br />
      <RecentDiscard />
    </div>
  );
}
