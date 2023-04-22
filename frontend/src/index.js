import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './components/SocketProvider'
import App from './App';
import { UsernameProvider } from './components/UsernameProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <UsernameProvider>
            <SocketProvider>
                <App/> 
            </SocketProvider>
        </UsernameProvider>
    </BrowserRouter>
);