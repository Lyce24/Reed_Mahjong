import { BrowserRouter } from 'react-router-dom';
import GameRoutes from './routes.js';

export default function App() {
    return (
      <BrowserRouter>
        <GameRoutes/>
      </BrowserRouter>
    );
}
