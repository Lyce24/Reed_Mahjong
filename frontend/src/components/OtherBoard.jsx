import Tile from './Tile';
import { useState } from 'react';
import '../index.css';
import { nanoid } from 'nanoid';

export default function OtherBoard({orientation}) {

    let initialTiles = Array(13).fill({
        suite: "bamboo",
        number: 1,
        index: 0,
        key: nanoid()
    })

    initialTiles.forEach((tile,index) =>{
        tile.index = index;
    })
    
    const [hand, setHand] = useState(initialTiles);
    
    return (
        <div className={'board otherBoard ' + orientation}>
            {hand.map(tile => (
                <Tile 
                    suite={tile.suite} 
                    number={tile.number} 
                    isFacedDown="true" 
                    key={tile.key}/>
            ))}
        </div>
    );
}