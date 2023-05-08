import { BrowserRouter } from 'react-router-dom';
import GameRoutes from './routes.js';
import { SocketProvider } from './components/SocketProvider'
import { UsernameProvider } from './components/UsernameProvider';

export default function App() {
  return (
    <UsernameProvider>
      <SocketProvider>
        <BrowserRouter>
          <GameRoutes />
        </BrowserRouter>
      </SocketProvider>
    </UsernameProvider>

  );
}
