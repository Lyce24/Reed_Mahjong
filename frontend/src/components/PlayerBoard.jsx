import Tile from './Tile';
import { useState } from 'react';
import '../index.css';

export default function PlayerBoard() {

    let initialTiles = Array(13);
    for (let i = 0; i<13; i++) {
        initialTiles.push({
        suite: "bamboo",
        number: Math.min(i+1,9),
        index: i
        })
    }
    const [hand, setHand] = useState(initialTiles);
    //const [drawnTile, setTile] = useState({suite: "", number: 0});
    
    
    // Template for adding elements to array
    /* const temp = () => {
        let updateHand = [...hand, {
            suite: "bamboo",
            number: 1
        }];
        setHand(updateHand);
    }; */
    

    return (
        <div className='board playerBoard'>
            {hand.map(tile => (
                <Tile suite={tile.suite} number={tile.number} isFacedDown="false"/>
            ))}
        </div>
    );
}