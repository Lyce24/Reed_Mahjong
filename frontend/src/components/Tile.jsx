import React from 'react';

class Tile extends React.Component {

    constructor(props){
        super(props);
    }
    render() {
        if (this.props.isFacedDown == "true") {
            return (
                <div className='tile faceDown'>
                    <p>Tile face down</p>
                    <img src="./images/til/facedown" alt={`Tile Facedown`} />
                </div>
            )
        } else {
            return(
                <div className='tile'>
                    <p>Tile {this.props.suite} {this.props.number}</p>
                    <img src="./images/tile" alt={`Tile ${this.props.suite} ${this.props.number}`} />
                </div>
            )
        }
    }
}

export default Tile;