
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UsernameProvider } from './components/UsernameProvider';
import { SocketProvider } from './components/SocketProvider';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
//import { useSocket } from "./SocketProvider";
//import { useNavigate } from 'react-router-dom';

import App from './App';
import MainPage from './components/MainPage';
import RoomPage from './components/RoomPage';

// wrapper functions to render components with context
function renderWithinApp(component) {
  return render(
    <App>{component}</App>
  );
}

function renderWithContext(component) {
  render(
    <UsernameProvider>
      <SocketProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </SocketProvider>
    </UsernameProvider>
  )
}

function renderFromURL(route) {

  return render(
    <UsernameProvider>
      <SocketProvider>
        <MemoryRouter initialEntries={route}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/room/:roomid' element={<RoomPage />} />
          </Routes>
        </MemoryRouter>
      </SocketProvider>
    </UsernameProvider>
  );
};

function renderFromHistory(history) {
  return render(
    <UsernameProvider>
      <SocketProvider>
        <Router history={history}>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/room/:roomid' element={<RoomPage />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UsernameProvider>
  );
};

// test app renders correctly with context
describe('Render without mock functions', () => {
  describe('App component', () => {
    it('app renders without crashing', () => {
      render(<App />);
    });
    it('app renders main page', async () => {
      render(<App />);
      expect(screen.getByRole('heading')).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Room!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Join Room');
      expect(joinRoomButton).toBeInTheDocument();
    });
  });
  describe('Main Page component', () => {
    it('renders with context and router', async () => {
      renderWithContext(<MainPage />);

      expect(screen.getByRole('heading',)).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Room!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Join Room');
      expect(joinRoomButton).toBeInTheDocument();
      expect(location.pathname).toBe('/');
    });

    it('renders from url', async () => {
      const { container } = renderFromURL([`/`]);

      /* expect(screen.getByRole('heading',)).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Room!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Join Room');
      expect(joinRoomButton).toBeInTheDocument(); */
      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();

      // Assert that the CreateRoomButton component is rendered
      expect(screen.getByRole('button', { name: /Create a Room!/i })).toBeInTheDocument();

      // Assert that the JoinRoom component is rendered
      expect(screen.getByRole('button', { name: /Join Room/i })).toBeInTheDocument();

    });

    it('create button click, rendered from url', async () => {
      const { container } = renderFromURL([`/`]);

      const createGameButton = screen.getByText('Create a Room!');
      expect(createGameButton).toBeInTheDocument();
      fireEvent.click(createGameButton);
      console.log(container.innerHTML)

    });
  });
  describe('Room Page component', () => {
    it('renders with context, room id null', async () => {
      renderWithContext(<RoomPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Room');
    });

    it('renders with url, room id 123', async () => {
      const roomid = 123;
      const { container } = renderFromURL([`/room/${roomid}`]);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Room 123');
      expect(container.querySelector('h1')).toHaveTextContent(`Room ${roomid}`);
      //expect(location.pathname).toBe('/room/123');
    });

    it('renders with redirect from main url, room id 123', async () => {
      const roomid = 123;
      const { container } = renderFromURL([`/`, `/room/${roomid}`]);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Room 123');
      expect(container.querySelector('h1')).toHaveTextContent(`Room ${roomid}`);
      //expect(location.pathname).toBe('/room/123');
    });

    xit('render from history, room id 123', async () => {
      const history = createMemoryHistory();
      history.push('/room/123');
      const { container } = renderFromHistory(history);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Room 123');
      expect(container.querySelector('h1')).toHaveTextContent(`Room ${roomid}`);
      //expect(location.pathname).toBe('/room/123');
    });

    xit('renders with no player tiles', async () => {
      const roomid = 123;
      const { container } = renderFromURL([`/room/${roomid}`]);

      console.log('first child', container.getElementsByClassName('roomPage').length);
      //console.log('playerboard', container.querySelector('div'));
      //console.log('playerboard', container.querySelector('playerboard'));
      //expect(.toHaveTextContent(`Room ${roomid}`);
    });
  });
});

describe('Render with mock functions', () => {
  describe('Main Page component', () => {
    it('render main page, mock all functions', async () => {
      // Mock use navigate
      const mockUseNavigate = jest.fn();
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: mockUseNavigate,
      }));

      // Mock use state
      const mockUseState = jest.fn();
      const mockRoomNum = 0;
      const mockSetRoomNum = jest.fn();
      mockUseState.mockReturnValueOnce([mockRoomNum, mockSetRoomNum]);
      jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: mockUseState,
      }));

      // Mock the implementation of the SocketContext provider
      const mockWebSocket = {
        send: jest.fn(),
        addRoomListener: jest.fn(),
        close: jest.fn(),
      };
      jest.spyOn(require('./components/SocketProvider'), 'useSocket').mockReturnValue(mockWebSocket);
      mockWebSocket.send.mockImplementation(() => { useNavigate('/room/000') });
      /* jest.mock('./components/SocketProvider', () => ({
        ...jest.requireActual('./components/SocketProvider'),
        useSocket: () => mockWebSocket,
      })); */

      renderWithContext(<MainPage />);

      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
      expect(mockWebSocket.addRoomListener).toHaveBeenCalledTimes(1);//.toHaveBeenCalledWith(mockSetRoomNum, mockUseNavigate);// Assert that the socket.addRoomListener function is called with the expected arguments
    });

    it('render main page, click create button, send create message', async () => {
      // Mock the implementation of the SocketContext provider
      const mockWebSocket = {
        send: jest.fn(),
        addRoomListener: jest.fn(),
        close: jest.fn(),
      };
      jest.spyOn(require('./components/SocketProvider'), 'useSocket').mockReturnValue(mockWebSocket);

      renderWithContext(<MainPage />);

      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
      expect(mockWebSocket.addRoomListener).toHaveBeenCalledTimes(1);

      // Assert that socket send is called after clicking the create game button
      const createGameButton = screen.getByText('Create a Room!');
      expect(createGameButton).toBeInTheDocument();
      expect(mockWebSocket.send).toHaveBeenCalledTimes(0);
      fireEvent.click(createGameButton);
      expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
      expect(mockWebSocket.send).toHaveBeenCalledWith({
        type: "create_room",
      });
    });

    it('render main page, click join button, send join message w default room num 0', async () => {
      // Mock use state
      const mockUseState = jest.fn();
      const mockRoomNum = 0;
      const mockSetRoomNum = jest.fn();
      mockUseState.mockReturnValueOnce([mockRoomNum, mockSetRoomNum]);
      jest.mock('react', () => ({
        ...jest.requireActual('react'),
        useState: mockUseState,
      }));

      // Mock the implementation of the SocketContext provider
      const mockWebSocket = {
        send: jest.fn(),
        addRoomListener: jest.fn(),
        close: jest.fn(),
      };
      jest.spyOn(require('./components/SocketProvider'), 'useSocket').mockReturnValue(mockWebSocket);

      renderWithContext(<MainPage />);

      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
      expect(mockWebSocket.addRoomListener).toHaveBeenCalledTimes(1);

      // Assert that socket send is called after clicking the create game button
      const joinGameButton = screen.getByText('Join Room');
      expect(joinGameButton).toBeInTheDocument();
      expect(mockWebSocket.send).toHaveBeenCalledTimes(0);
      fireEvent.click(joinGameButton);
      expect(mockWebSocket.send).toHaveBeenCalledTimes(1);
      expect(mockWebSocket.send).toHaveBeenCalledWith({
        type: "join_room",
        room_id: mockRoomNum,
      });

      // Assert that page navigates to new room
      //expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      //expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Room 000');
    });
  });
});