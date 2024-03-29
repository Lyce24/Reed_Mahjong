import PlayerBoard from "./PlayerBoard";
import OtherBoard from "./OtherBoard";
import MiddleSection from "./MiddleSection";
import "../index.css";
import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useUsername } from "./UsernameProvider";
import { useLayoutEffect } from "react";
import GameEndMsg from "./GameEndMsg";

/* structure of tiles:
let temporaryDrawnTile = {
    suite: "bamboo",
    number: 2,
    index: 100, // the order of this tile in hand tiles
    key: nanoid(),
  }; 
*/
export default function GameBoard({ room_id }) {
  const socket = useSocket();
  const username = useUsername();
  const [gameEndStatus, setGameEndStatus] = useState(false);

  // setup listeners once upon initial render of game board
  useLayoutEffect(() => {
    // setup start tiles listener: display 'hand' tiles when receive backend 'start_tiles' msg
    socket.addStartTileListener(
      setHand,
      username,
      compareTile,
      setUsernameArray,
      setDiscardPiles
    );
    console.log("add start tile listener");
    // setup draw listener: display 'drawnTile' when receive backend 'draw_tile' msg
    socket.addDrawListener(setDrawnTile, setSelectedTileIndex, username);
    socket.addPengListener(setPengPrompt, setPengTile, username);
    socket.addChiListener(setChiPrompt, setChiTile, username);
    socket.addHuListener(setHuPrompt, setHuTile, username);
    socket.addGameEndListener(setGameEndStatus);
  }, []);

  const [hand, setHand] = useState(null);
  const [playerDiscardPile, setPlayerDiscardPile] = useState(
    // Array(15).fill({
    //   suite: "bamboo",
    //   number: 2,
    // })
    []
  );
  const [leftDiscardPile, setLeftDiscardPile] = useState([]);
  const [rightDiscardPile, setRightDiscardPile] = useState([]);
  const [topDiscardPile, setTopDiscardPile] = useState([]);
  const discardPiles = [
    playerDiscardPile,
    rightDiscardPile,
    topDiscardPile,
    leftDiscardPile,
  ];
  const setDiscardPiles = [
    setPlayerDiscardPile,
    setRightDiscardPile,
    setTopDiscardPile,
    setLeftDiscardPile,
  ];
  const [usernameArray, setUsernameArray] = useState([]);

  // select the tile that is clicked
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  function handleTileClick(index) {
    console.log("tile clicked", index, selectedTileIndex);
    if (index === selectedTileIndex) {
      // If the clicked child is already selected, deselect it
      setSelectedTileIndex(null);
    } else {
      // Otherwise, deselect the previously selected child and select the new child
      setSelectedTileIndex(index);
    }
  }

  // drawn tile, due to normal game logic or peng logic
  const [drawnTile, setDrawnTile] = useState(null);

  // remove selected tile from hand, submit 'discard_tile' msg to backend
  // add drawn tile to hand, reorder and reindex hand tiles
  // remove discard button
  function handleDiscard(params) {
    if (selectedTileIndex == null) {
      //alert("You have not selected any tile!");
      console.log(hand);
    } else {
      // discard drawn tile or selected tile
      let selectedTile =
        selectedTileIndex == 14 ? drawnTile : hand[selectedTileIndex];
      socket.send({
        type: "discard_tile",
        tile: selectedTile,
        room_id: room_id,
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
      setDrawnTile(null);
      setSelectedTileIndex(null);
    }
  }

  const [pengTile, setPengTile] = useState(null);
  const [pengPrompt, setPengPrompt] = useState(false);

  // If user rejects Peng prompt: send reject message to backend, remove peng tile and peng prompt
  function handlePengReject() {
    console.log("peng reject clicked");
    socket.send({
      type: "performing_peng",
      action: "0",
      tile: pengTile,
      room_id: room_id,
    });
    setPengTile(null);
    setPengPrompt(false);
  }

  // If user accepts peng: send accept message to backend, move peng tile to drawn tile, remove peng tile and peng prompt
  function handlePengAccept() {
    console.log("peng accept clicked");
    socket.send({
      type: "performing_peng",
      action: "1",
      tile: pengTile,
      room_id: room_id,
    });
    setDrawnTile(pengTile);
    setPengTile(null);
    setPengPrompt(false);
  }

  const [huPrompt, setHuPrompt] = useState(false);
  const [huTile, setHuTile] = useState(null);

  function handleHuReject() {
    console.log("hu reject clicked");
    socket.send({
      type: "performing_hu",
      action: "0",
      tile: huTile,
      room_id: room_id, // this might pose a problem if the backend is relying on the frontend to reliably send it a room ID
    }); // someone could potentially modify their client and send the backend a different room ID
    setHuTile(null); // i'll check how the backend handles this and make sure it retuns an error if sent room ID doesn't match the user's room - El
    setHuPrompt(false);
  }

  function handleHuAccept() {
    console.log("hu accept clicked");
    socket.send({
      type: "performing_hu",
      action: "1",
      tile: huTile,
      room_id: room_id,
    });
    setDrawnTile(huTile);
    setHuTile(null);
    setHuPrompt(false);
  }

  const [chiTile, setChiTile] = useState(null);
  const [chiPrompt, setChiPrompt] = useState(false);

  // If user rejects Chi prompt: send reject message to backend, remove chi tile and chi prompt
  function handleChiReject() {
    console.log("chi reject clicked");
    socket.send({
      type: "performing_chi",
      action: "0",
      tile: chiTile,
      room_id: room_id,
    });
    setChiTile(null);
    setChiPrompt(false);
  }

  // If user accepts chi: send accept message to backend, move chi tile to drawn tile, remove chi tile and chi prompt
  function handleChiAccept() {
    console.log("chi accept clicked");
    socket.send({
      type: "performing_chi",
      action: "1",
      tile: chiTile,
      room_id: room_id,
    });
    setDrawnTile(chiTile);
    setChiTile(null);
    setChiPrompt(false);
  }

  return (
    <div className="gameBoard">
      {gameEndStatus && <GameEndMsg></GameEndMsg>}
      <PlayerBoard
        hand={hand}
        selectedTileIndex={selectedTileIndex}
        drawnTile={drawnTile}
        pengPrompt={pengPrompt}
        pengTile={pengTile}
        chiPrompt={chiPrompt}
        chiTile={chiTile}
        huPrompt={huPrompt}
        huTile={huTile}
        handleTileClick={handleTileClick}
        handleDiscard={handleDiscard}
        handlePengAccept={handlePengAccept}
        handlePengReject={handlePengReject}
        handleChiAccept={handleChiAccept}
        handleChiReject={handleChiReject}
        handleHuAccept={handleHuAccept}
        handleHuReject={handleHuReject}
      />
      <br />
      <OtherBoard orientation="leftBoard" />
      <br />
      <OtherBoard orientation="rightBoard" />
      <br />
      <OtherBoard orientation="topBoard" />
      <br />
      <MiddleSection
        discardPiles={discardPiles}
        usernameArray={usernameArray}
      />
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
