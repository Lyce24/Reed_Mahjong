import MainPage from './components/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoomPage from './components/RoomPage';

export default function App(prop) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/room/:roomid' element={<RoomPage/>}/>
        </Routes>
      </BrowserRouter>
      
    );
}
