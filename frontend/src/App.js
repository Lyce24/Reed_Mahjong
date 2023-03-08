import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router-dom';
import Room from './Room';

function App(prop) {
    return (
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/room/:roomid' element={<Room />}/>
      </Routes>
    );
}

export default App;
