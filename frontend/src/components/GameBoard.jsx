import React from 'react';
import PlayerBoard from './PlayerBoard';
import OtherBoard from './OtherBoard';
import '../index.css';

class GameBoard extends React.Component {

    render() {
        return(
            <div className='gameBoard'>
                <PlayerBoard />
                <br />
                <OtherBoard />
                <br />
                <OtherBoard />
                <br />
                <OtherBoard />
            </div>            
        )
    }
}

export default GameBoard;