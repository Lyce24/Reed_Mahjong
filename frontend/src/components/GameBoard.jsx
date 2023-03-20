import React from 'react';
import Tile from './Tile';

class GameBoard extends React.Component {

    render() {
        return(
            <div>
                <Tile suite="bamboo" number="10" />
            </div>            
        )
    }
}

export default GameBoard;