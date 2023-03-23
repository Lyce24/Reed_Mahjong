import { useState } from 'react';

export default function Tile(props) {

    const [clickState, setState] = useState(false);

    function handleClick() {
        // toggle clickState
        setState(!clickState);
        console.log(!clickState);
    }
    let clicked = `${clickState ? "clicked" : ""}`;

    if (props.isFacedDown == "true") {
        return (
            <div className={`tile faceDown ${clicked}`} onClick={handleClick}>
                <p>Tile face down</p>
                <img src="./images/til/facedown" alt={`Tile Facedown`} />
            </div>
        );
    } else {
        return (
            <div className={`tile ${clicked}`} onClick={handleClick}>
                <p>Tile {props.suite} {props.number}</p>
                <img src="./images/tile" alt={`Tile ${props.suite} ${props.number}`} />
            </div>
        );
    }
}