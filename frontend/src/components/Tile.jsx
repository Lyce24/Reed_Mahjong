export default function Tilt(props) {

    if (props.isFacedDown == "true") {
        return (
            <div className='tile faceDown'>
                <p>Tile face down</p>
                <img src="./images/til/facedown" alt={`Tile Facedown`} />
            </div>
        );
    } else {
        return (
            <div className='tile'>
                <p>Tile {props.suite} {props.number}</p>
                <img src="./images/tile" alt={`Tile ${props.suite} ${props.number}`} />
            </div>
        );
    }
}