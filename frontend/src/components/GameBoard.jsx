import React from 'react';
import PlayerBoard from './PlayerBoard';
import OtherBoard from './OtherBoard';
import '../index.css';

export default function GameBoard() {

    return (
        <div className='gameBoard'>
            <PlayerBoard />
            <br />
            <OtherBoard />
            <br />
            <OtherBoard />
            <br />
            <OtherBoard />
        </div>
    );
}