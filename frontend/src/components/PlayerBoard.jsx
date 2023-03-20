import React from 'react';
import Tile from './Tile';
import '../index.css';

class PlayerBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 13 tiles + 1 drawn tile
            tiles: Array(13).fill(null),//["bamboo-10"],
        };
    }

    render() {
        return(
            <div className='playerBoard'>
                <Tile suite="bamboo" number="10" isFacedDown="false" />
                <Tile suite="bamboo" number="9" isFacedDown="false"/>
                <Tile suite="bamboo" number="8" isFacedDown="false"/>
            </div>            
        )
    }
}

export default PlayerBoard;