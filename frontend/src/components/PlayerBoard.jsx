import Tile from "./Tile";
import { useState } from "react";
import "../index.css";
import DiscardButton from "./DiscardButton";
import { nanoid } from "nanoid";
import { useSocket } from "./SocketProvider";

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

export default function PlayerBoard() {
  const socket = useSocket();

  // initialize 13 tiles for player hand, for test purposes only
  let initialTiles = []; // Array();
  for (let i = 0; i < 13; i++) {
    initialTiles.push({
      suite: "bamboo",
      number: Math.min(i + 1, 9),
      index: i,
      key: nanoid(),
    });
  }
  const [hand, setHand] = useState(initialTiles);
  const [selectedTile, setSelectedTile] = useState(null);

  // select the tile that is clicked
  function handleTileClick(index) {
    if (index === selectedTile) {
      // If the clicked child is already selected, deselect it
      setSelectedTile(null);
    } else {
      // Otherwise, deselect the previously selected child and select the new child
      setSelectedTile(index);
    }
  }

  //TODO: get drawn tile from backend and display on the right side of playerboad
  // TODO: (backend) generate new key for each drawn tile
  // initialize drawn tile, for test purposes only
  // change initial value to null after tests
  const [drawnTile, setDrawnTile] = useState({
    suite: "bamboo",
    number: 2,
    index: 100,
    key: nanoid(),
  });
  // setup draw listener, updates 'drawnTile' when receive backend 'draw_tile' msg
  socket.addDrawListener(setDrawnTile);

  // setup discard listener, calls 'handleDiscard' when receive discard msg from backend
  socket.addDiscardListener(handleDiscard);

  // remove selected tile from hand, submit 'discard_tile' msg to backend
  // TODO: add drawn tile to hand
  // sort and update hand tiles
  function handleDiscard(params) {
    if (selectedTile == null) {
      //alert("You have not selected any tile!");
      console.log(hand);
    } else {
      // remove tile that is selected
      let updatedHand = hand.toSpliced(selectedTile, 1);
      // put drawn tile in hand
      updatedHand = [...updatedHand, drawnTile];
      // reorder tiles
      updatedHand.sort(compareTile);
      // reindex tiles
      updatedHand.forEach((tile, index) => {
        tile.index = index;
      });
      setHand(updatedHand);
      setSelectedTile(null);
    }
  }

  return (
    <div className="board playerBoard">
      {hand.map((tile) => (
        <Tile
          suite={tile.suite}
          number={tile.number}
          index={tile.index}
          onClick={handleTileClick}
          isSelected={selectedTile === tile.index}
          isFacedDown="false"
          key={tile.key}
        />
      ))}
      <DiscardButton onClick={handleDiscard} />
    </div>
  );
}
