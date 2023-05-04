//import { useState } from 'react';
const images = require.context("../tiles", false);
//const images = () => "";

export default function Tile(props) {
  function handleClick() {
    props.onClick(props.index);
  }

  // If the tile is Selected, add the "selected" class to the tile
  // If the tile is Drawn, add the "drawn" class to the tile
  let selected = `${props.isSelected ? "selected" : ""}`;
  let drawn = `${props.isDrawn ? "drawn" : ""}`;

  if (props.isFacedDown === "true") {
    return (
      <div className={`tile faceDown ${selected} ${drawn}`}>
        <img src={images("./back.png")} alt={`Facedown`} />
      </div>
    );
  } else {
    let suite = props.suite;
    let number = props.number;
    return (
      <div className={`tile ${selected} ${drawn}`} onClick={handleClick}>
        <img
          src={images(`./${suite}-${number}.png`)}
          alt={`${suite} ${number}`}
        />
      </div>
    );
  }
}
