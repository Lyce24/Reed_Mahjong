import React from 'react';
import CreateRoomButton from './CreateRoomButton';
import JoinRoomButton from './JoinRoomButton';

export default function MainPage() {
    return (
        <div className='mainPage'>
            <h3>Welcome to Reed Mahjong!</h3>
            <hr></hr>
            <CreateRoomButton />
            <br />
            <JoinRoomButton />
        </div>
    )
}