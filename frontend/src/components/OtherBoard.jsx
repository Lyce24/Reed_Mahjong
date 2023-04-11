import Tile from './Tile';
import { useState } from 'react';
import '../index.css';

export default function OtherBoard() {

    let initialTiles = Array(3).fill({
        suite: "bamboo",
        number: 1
    })
    const [hand, setHand] = useState(initialTiles);

    return (
        <div className='playerBoard otherBoard'>
            {hand.map(tile => (
                <Tile suite={tile.suite} number={tile.number} isFacedDown="true"/>
            ))}
        </div>
    );
}