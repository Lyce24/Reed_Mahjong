import React from 'react';
import Tile from './Tile';
import '../index.css';

class OtherBoard extends React.Component {

    render() {
        return(
            <div className='playerBoard other'>
                <Tile suite="bamboo" number="10" isFacedDown="true"/>
                <Tile suite="bamboo" number="9" isFacedDown="true"/>
                <Tile suite="bamboo" number="8" isFacedDown="true"/>
            </div>            
        )
    }
}

export default OtherBoard;