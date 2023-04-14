import Tile from './Tile';
import { useState } from 'react';
import '../index.css';

export default function OtherBoard({orientation}) {

    let initialTiles = Array(13).fill({
        suite: "bamboo",
        number: 1
    })
    
    const [hand, setHand] = useState(initialTiles);
    
    return (
        <div className={'board otherBoard ' + orientation}>
            {hand.map(tile => (
                <Tile suite={tile.suite} number={tile.number} isFacedDown="true"/>
            ))}
        </div>
    );
}