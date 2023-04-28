import ReactDOM from 'react-dom/client';
import { SocketProvider } from './components/SocketProvider'
import App from './App';
import { UsernameProvider } from './components/UsernameProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UsernameProvider>
        <SocketProvider>
            <App/> 
        </SocketProvider>
    </UsernameProvider>
);