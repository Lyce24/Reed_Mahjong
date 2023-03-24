import { useState } from 'react';
import img from '../tiles/back.png';
import * as images from '../tiles/back.png';

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
                <img src={img} alt={`Facedown`} />
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