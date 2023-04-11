import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './components/RoomPage';

import { SOCKET_URL, useWS, getWebSocket } from './logics/ws-handler';

export default function App(prop) {
  useWS(SOCKET_URL, {
    onOpen: (event) => {
      console.log("Socket opened!")
    },

    onMessage: (event) => {
      console.log(JSON.parse(event.data))
      // JSON.parse(event.data)
      const serverData = event.data
      // switch (serverData.type) {
      //   case "room_created":
      //     break;
      //   default:
      //     // handle error and display 
      //     // throw Error("Unknown message type: " + serverData.type)
      // }
    },
    onclose: (event) => {
      console.log(event)
    },
    onError: (event) => {
      console.log(event)
    }
  });

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/room/:roomid' element={<RoomPage />} />
    </Routes>
  );
}
