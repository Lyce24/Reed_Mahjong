import Tile from './Tile';
import { useState } from 'react';
import '../index.css';
import DiscardButton from './DiscardButton';
import { nanoid } from 'nanoid';
//import { useSocket } from './SocketProvider';

function compareTile(a, b){
    // wan < circle < bamboo
    if (a.suite === b.suite) {
        return a.number - b.number
    } else if (a.suite === "wan" && (b.suite === "circle" || b.suite === "bamboo")){
        // a before b
        return -1
    } else if (a.suite === "circle" && b.suite === "bamboo"){
        // a before b
        return -1
    } else {
        // b before a
        return 1
    }
}

export default function PlayerBoard() {

    //const socket = useSocket();

    let initialTiles = []; // Array();
    for (let i = 0; i<13; i++) {
        initialTiles.push({
        suite: "bamboo",
        number: Math.min(i+1,9),
        index: i,
        key: nanoid()
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

    //TODO: get drawn tile from backend and display on the right side of playerboad
    // TODO: (backend) generate new key for each drawn tile 
    const [drawnTile, setDrawnTile] = useState({
        suite: "bamboo", 
        number: 2, 
        index:100,
        key: nanoid()
    });
    //socket.receive(setDrawnTile);

    function handleDiscard(params) {
        if (selectedTile == null){
            //alert("You have not selected any tile!");
            console.log(hand)
        } else {
            // remove tile that is selected
            let updatedHand = hand.toSpliced(selectedTile, 1);
            // put drawn tile in hand
            updatedHand = [...updatedHand, drawnTile];
            // reorder tiles
            updatedHand.sort(compareTile);
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
                <Tile 
                    suite={tile.suite} 
                    number={tile.number} 
                    index={tile.index} 
                    onClick={handleTileClick} 
                    isSelected={selectedTile === tile.index} 
                    isFacedDown="false"
                    key={tile.key}
                    />
            ))}
            <DiscardButton onClick={handleDiscard}/>
        </div>
        
    );
}