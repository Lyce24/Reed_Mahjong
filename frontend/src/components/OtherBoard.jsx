import Tile from './Tile';
import '../index.css';

export default function OtherBoard() {

    return (
        <div className='playerBoard other'>
            <Tile suite="bamboo" number="7" isFacedDown="true" />
            <Tile suite="bamboo" number="9" isFacedDown="true" />
            <Tile suite="bamboo" number="8" isFacedDown="true" />
        </div>
    );
}