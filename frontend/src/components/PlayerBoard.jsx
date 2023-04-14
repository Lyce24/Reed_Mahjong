import Tile from './Tile';
import { useState, useRef } from 'react';
import '../index.css';
import DiscardButton from './DiscardButton';

export default function PlayerBoard() {

    let initialTiles = Array();
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

    //TODO: get drawn tile from backend
    const [drawnTile, setDrawnTile] = useState({suite: "circle", number: 1});

    function handleDiscard(params) {
        if (selectedTile == null){
            //alert("You have not selected any tile!");
            console.log(hand)
        } else {
            // remove tile that is selected
            let updatedHand = hand.toSpliced(selectedTile, 1);
            // put drawn tile in hand
            updatedHand = [...updatedHand, drawnTile];
            // reindex tiles
            updatedHand.forEach((tile,index) =>{
                tile.index = index;
            })
            setHand(updatedHand);
            setSelectedTile(null);
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