import CreateRoomButton from './CreateRoomButton';
import JoinRoom from './JoinRoom';

export default function MainPage() {
    return (
        <div className='page mainPage'>
            <h3>Welcome to Reed Mahjong!</h3>
            <hr></hr>
            <CreateRoomButton />
            <br />
            <JoinRoom />
        </div>
    );
}