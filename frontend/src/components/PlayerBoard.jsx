import Tile from './Tile';
import { useState } from 'react';
import '../index.css';

export default function PlayerBoard() {

    // 13 tiles + 1 drawn tile
    let initialTiles = Array(13).fill({
        suite: "bamboo",
        number: 1
    })
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