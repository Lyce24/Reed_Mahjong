import Tile from './Tile';
import middleSection from './MiddleSection';
import '../index.css';

export default function Discard({orientation}) {

    let initialTiles = Array(4).fill({
        suite: "bamboo",
        number: 1
    })
    
    // const [hand, setHand] = useState(initialTiles);
    
    return (
        <div className={'discard ' + orientation}>
            {/* {hand.map(tile => (
                <Tile suite={tile.suite} number={tile.number} isFacedDown="true"/>
            ))} */}
        </div>
    );
}