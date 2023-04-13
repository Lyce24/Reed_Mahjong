import { useState } from 'react';
const images = require.context('../tiles', false);

export default function Tile(props) {

    function handleClick() {
        props.onClick(props.index)
    }

    let clicked = `${props.isSelected ? "clicked" : ""}`;

    if (props.isFacedDown === "true") {
        return (
            <div className={`tile faceDown ${clicked}`}>
                <img src={images('./back.png')} alt={`Facedown`}/>
            </div>
        );
    } else {
        let suite = props.suite;
        let number = props.number;
        return (
            <div className={`tile ${clicked}`} onClick={handleClick}>
                <img src={images(`./${suite}-${number}.png`)} alt={`${suite} ${number}`} />
            </div>
        );
    }
}