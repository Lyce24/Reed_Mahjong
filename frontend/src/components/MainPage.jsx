import CreateRoomButton from './CreateRoomButton';
import JoinRoom from './JoinRoom';
import { getWebSocket } from '../logics/ws-handler';


export default function MainPage() {

    const { sendMessage } = getWebSocket()

    return (
        <div className='mainPage'>
            <h3>Welcome to Reed Mahjong!</h3>
            <hr></hr>
            <CreateRoomButton />
            <br />
            <JoinRoom />
        </div>
    );
}