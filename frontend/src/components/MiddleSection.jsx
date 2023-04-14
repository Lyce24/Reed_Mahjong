import GameBoard from './GameBoard';
import Discard from './Discard';
import RecentDiscard from './RecentDiscard';
import '../index.css';

export default function MiddleSection() {

    return (
        <div className='middleSection'>
            <Discard orientation="playerDiscard" />
            <br />
            <Discard orientation="leftDiscard" />
            <br />
            <Discard orientation="rightDiscard" />
            <br />
            <Discard orientation="topDiscard" />
            <br />
            <RecentDiscard />
        </div>
    );
}