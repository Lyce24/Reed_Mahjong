import Tile from './Tile';
import { useState, useRef } from 'react';
import '../index.css';
import DiscardButton from './DiscardButton';

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
    const [selectedTile, setSelectedTile] = useState(null);

    function handleTileClick(index) {
        if (index === selectedTile) {
            // If the clicked child is already selected, deselect it
            setSelectedTile(null);
        } else {
            // Otherwise, deselect the previously selected child and select the new child
            setSelectedTile(index);
        }
    }
    //const [drawnTile, setTile] = useState({suite: "", number: 0});

    function handleDiscard(params) {
        if (selectedTile == null){
            alert("You have not selected any tile!");
        } else {
            // console.log("discard tile" + index);
            // remove tile that is selected
            // hand.pop(index)
        }
    }
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
                <Tile suite={tile.suite} number={tile.number} index={tile.index} onClick={handleTileClick} isSelected={selectedTile == tile.index} isFacedDown="false"/>
            ))}
            <DiscardButton onClick={handleDiscard}/>
        </div>
        
    );
}