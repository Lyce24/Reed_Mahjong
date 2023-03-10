import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './components/RoomPage';

function App(prop) {
    return (
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/room/:roomid' element={<RoomPage/>}/>
      </Routes>
    );
}

export default App;
