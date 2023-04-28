import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import RoomPage from './components/RoomPage';

export default function GameRoutes() {
    return (
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/room/:roomid' element={<RoomPage/>}/>
        </Routes>
    );
}
