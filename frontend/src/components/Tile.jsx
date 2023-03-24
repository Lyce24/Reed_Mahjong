import { useState } from 'react';

export default function Tile(props) {

    const [clickState, setState] = useState(false);

    function handleClick() {
        // toggle clickState
        setState(!clickState);
        console.log(!clickState);
    }
    let clicked = `${clickState ? "clicked" : ""}`;

    if (props.isFacedDown === "true") {
        return (
            <div className={`tile faceDown ${clicked}`} onClick={handleClick}>
                <img src="./images/tile-facedown" alt={`Facedown`} />
            </div>
        );
    } else {
        let suite = props.suite;
        let number = props.number;
        return (
            <div className={`tile ${clicked}`} onClick={handleClick}>
                <img src={`./images/tile-${suite}-${number}`} alt={`${suite} ${number}`} />
            </div>
        );
    }
}