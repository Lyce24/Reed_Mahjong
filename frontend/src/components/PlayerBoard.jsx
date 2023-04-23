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
  // TODO: get initial 13 tiles from backend (after backend is implemented)
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
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);

  // select the tile that is clicked
  function handleTileClick(index) {
    if (index === selectedTileIndex) {
      // If the clicked child is already selected, deselect it
      setSelectedTileIndex(null);
    } else {
      // Otherwise, deselect the previously selected child and select the new child
      setSelectedTileIndex(index);
    }
  }

  //TODO: get drawn tile from backend and
  // TODO: designate area on the right side of playerboad to display the drawn tile
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
    <div className="board playerBoard">
      {hand.map((tile) => (
        <Tile
          suite={tile.suite}
          number={tile.number}
          index={tile.index}
          onClick={handleTileClick}
          isSelected={selectedTileIndex === tile.index}
          isFacedDown="false"
          key={tile.key}
        />
      ))}
      {/* Display drawn tile if it is not null */}
      {drawnTile && (
        <Tile
          suite={drawnTile.suite}
          number={drawnTile.number}
          index={drawnTile.index}
          onClick={handleTileClick}
          isSelected={selectedTileIndex === drawnTile.index}
          isDrawn={true}
          isFacedDown="false"
          key={drawnTile.key}
        />
      )}
      <DiscardButton onClick={handleDiscard} />
    </div>
  );
}
