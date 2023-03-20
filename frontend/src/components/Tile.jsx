import React from 'react';

class Tile extends React.Component {

    render() {
        return(
            <div className='Tile'>
                <p>Tile {this.props.suite} {this.props.number}</p>
                <img src="./images/tile" alt={`Tile ${this.props.suite} ${this.props.number}`} />
            </div>
            
        )
    }
}

export default Tile;