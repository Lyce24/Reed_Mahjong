import React from 'react';

class Tile extends React.Component {

    render() {
        return(
            <p>Tile {this.props.suite} {this.props.number}</p>
        )
    }
}

export default Tile;