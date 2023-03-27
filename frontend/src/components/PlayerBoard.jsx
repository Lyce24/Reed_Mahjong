import Tile from './Tile';
import { useState } from 'react';
import '../index.css';

export default function PlayerBoard() {

    // 13 tiles + 1 drawn tile
    const [hand, setHand] = useState(Array(13).fill(null));

    return (
        <div className='playerBoard'>
            <Tile suite="bamboo" number="7" isFacedDown="false" />
            <Tile suite="bamboo" number="9" isFacedDown="false" />
            <Tile suite="bamboo" number="8" isFacedDown="false" />
        </div>
    );
}