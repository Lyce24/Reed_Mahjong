import Tile from "./Tile";
import "../index.css";
import DiscardButton from "./DiscardButton";

export default function PlayerBoard(props) {
  return (
    <div className="board playerBoard">
      {/* Display hand tiles if it is not null */}
      {props.hand &&
        props.hand.map((tile) => (
          <Tile
            suite={tile.suite}
            number={tile.number}
            index={tile.index}
            onClick={props.handleTileClick}
            isSelected={props.selectedTileIndex === tile.index}
            isFacedDown="false"
            key={tile.key}
          />
        ))}

      {/* Display drawn tile if it is not null */}
      {props.drawnTile && (
        <Tile
          suite={props.drawnTile.suite}
          number={props.drawnTile.number}
          index={props.drawnTile.index}
          onClick={props.handleTileClick}
          isSelected={props.selectedTileIndex === props.drawnTile.index}
          isDrawn={true}
          isFacedDown="false"
          key={props.drawnTile.key}
        />
      )}
      {/* Display discard button only if there is a drawn tile */}
      {props.drawnTile && <DiscardButton onClick={props.handleDiscard} />}
    </div>
  );
}
