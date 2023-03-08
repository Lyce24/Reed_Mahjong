import CreateRoomButton from './CreateRoomButton';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Room from './Room';

function App(prop) {
    return (
      <Routes>
        <Route path='/' element={<CreateRoomButton />}/>
        <Route path='/room/:roomid' element={<Room />}/>
      </Routes>
    );
}

export default App;
