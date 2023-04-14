import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './components/SocketProvider'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <SocketProvider>
            <App/> 
        </SocketProvider>
    </BrowserRouter>
);