import PlayerBoard from './PlayerBoard';
import OtherBoard from './OtherBoard';
import MiddleSection from './MiddleSection';
import '../index.css';

export default function GameBoard() {

    return (
        <div className='gameBoard'>
            <PlayerBoard />
            <br />
            <OtherBoard orientation="leftBoard" />
            <br />
            <OtherBoard orientation="rightBoard" />
            <br />
            <OtherBoard orientation="topBoard" />
            <br />
            <MiddleSection />
        </div>
    );
}