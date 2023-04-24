import PlayerBoard from "./PlayerBoard";
import OtherBoard from "./OtherBoard";
import MiddleSection from "./MiddleSection";
import "../index.css";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useUsername } from "./UsernameProvider";

/* structure of tiles:
let temporaryDrawnTile = {
    suite: "bamboo",
    number: 2,
    index: 100, // the order of this tile in hand tiles
    key: nanoid(),
  }; 
*/
export default function GameBoard() {
  const socket = useSocket();
  const username = useUsername();

  // setup start tiles listener, display 'hand' tiles when receive backend 'start_tiles' msg
  const [hand, setHand] = useState(null);
  socket.addStartTileListener(setHand, username);

  // select the tile that is clicked
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  function handleTileClick(index) {
    if (index === selectedTileIndex) {
      // If the clicked child is already selected, deselect it
      setSelectedTileIndex(null);
    } else {
      // Otherwise, deselect the previously selected child and select the new child
      setSelectedTileIndex(index);
    }
  }

  // setup draw listener, display 'drawnTile' when receive backend 'draw_tile' msg
  const [drawnTile, setDrawnTile] = useState(null);
  socket.addDrawListener(setDrawnTile, username);

  // remove selected tile from hand, submit 'discard_tile' msg to backend
  // add drawn tile to hand, reorder and reindex hand tiles
  function handleDiscard(params) {
    if (selectedTileIndex == null) {
      //alert("You have not selected any tile!");
      console.log(hand);
    } else {
      //TODO: send discard_tile msg to backend
      socket.send({
        type: "discard_tile",
        tile: hand[selectedTileIndex],
      });
      // remove tile that is selected
      let updatedHand = hand.toSpliced(selectedTileIndex, 1);
      // put drawn tile in hand
      updatedHand = [...updatedHand, drawnTile];
      // set drawn tile to null
      setDrawnTile(null);
      // reorder tiles
      updatedHand.sort(compareTile);
      // reindex tiles
      updatedHand.forEach((tile, index) => {
        tile.index = index;
      });
      setHand(updatedHand);
      setSelectedTileIndex(null);
    }
  }

  return (
    <div className="gameBoard">
      <PlayerBoard
        hand={hand}
        setSelectedTileIndex={setSelectedTileIndex}
        drawnTile={drawnTile}
        handleTileClick={handleTileClick}
        handleDiscard={handleDiscard}
      />
      <br />
      <OtherBoard orientation="leftBoard" />
      <br />
      <OtherBoard orientation="rightBoard" />
      <br />
      <OtherBoard orientation="topBoard" />
      <br />
      <MiddleSection />
    </div>
  );
}

function compareTile(a, b) {
  // wan < circle < bamboo
  if (a.suite === b.suite) {
    return a.number - b.number;
  } else if (
    a.suite === "wan" &&
    (b.suite === "circle" || b.suite === "bamboo")
  ) {
    // a before b
    return -1;
  } else if (a.suite === "circle" && b.suite === "bamboo") {
    // a before b
    return -1;
  } else {
    // b before a
    return 1;
  }
}
