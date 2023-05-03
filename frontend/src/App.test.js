
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UsernameProvider } from './components/UsernameProvider';
import { SocketProvider } from './components/SocketProvider';
import { BrowserRouter, Router } from 'react-router-dom';
import * as TestRenderer from "react-test-renderer";
import { waitFor } from '@testing-library/react';
//import { useSocket } from "./SocketProvider";
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useNavigate } from 'react-router-dom';

import App from './App';
import MainPage from './components/MainPage';
import RoomPage from './components/RoomPage';
import CreateRoomButton from './components/CreateRoomButton';

// test app renders correctly with context
describe('Render without mock functions', () => {
  describe('App component', () => {
    it('app renders without crashing', () => {
      render(<App />);
    });
    it('app renders main page', async () => {
      render(<App />);
      expect(screen.getByRole('heading')).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Submit');
      expect(joinRoomButton).toBeInTheDocument();
    });
    xit('renders app without crashing with snapshot', () => {
      const tree = renderer
        .create(<App />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Main Page component', () => {
    it('renders with context and router', async () => {
      renderWithContext(<MainPage />);
  
      expect(screen.getByRole('heading',)).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Submit');
      expect(joinRoomButton).toBeInTheDocument();
      expect(location.pathname).toBe('/');
    });
  
    it('renders from url', async () => {
      const { container } = renderFromURL(`/`);
  
      /* expect(screen.getByRole('heading',)).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Submit');
      expect(joinRoomButton).toBeInTheDocument(); */
      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
  
      // Assert that the CreateRoomButton component is rendered
      expect(screen.getByRole('button', { name: /Create a Game!/i })).toBeInTheDocument();
  
      // Assert that the JoinRoom component is rendered
      expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  
    });
  
    it('create button click, rendered from url', async () => {
      const { container } = renderFromURL(`/`);
  
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      fireEvent.click(createGameButton);
      console.log(container.innerHTML)
  
    });
  });
  describe('Room Page component', () => {
    it('renders with context, room id null', async () => {
      renderWithContext(<RoomPage />);
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Room');
    });
  
    it('renders with url, room id 123', async () => {
      const roomid = 123;
      const { container } = renderFromURL(`/room/${roomid}`);
    
      expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Room 123');
      expect(container.querySelector('h1')).toHaveTextContent(`Room ${roomid}`);
      //expect(location.pathname).toBe('/room/123');
    });
  
    xit('renders with no player tiles', async () => {
      const roomid = 123;
      const { container } = renderFromURL(`/room/${roomid}`);
    
      console.log('first child', container.getElementsByClassName('roomPage').length);
      //console.log('playerboard', container.querySelector('div'));
      //console.log('playerboard', container.querySelector('playerboard'));
      //expect(.toHaveTextContent(`Room ${roomid}`);
    });
  });
});

/* jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
})); */

/* let mockSocket = {
  addRoomListener: jest.fn(),
  send: jest.fn(),
};

jest.mock('./components/SocketProvider', () => ({
  useSocket: () => mockSocket,
})); */

describe('Render with mock functions', () => {
  describe('Main Page component', () => {
    xit('create button click, mock navigate', async () => {
      //let mockNavigate = jest.fn();

      /* let mockedUsedNavigate = jest.fn();
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUsedNavigate,
      })); */
      /* const navigate = jest.fn();
      useNavigate.mockReturnValue(navigate); */
  
      renderWithContext(<MainPage/>);
  
      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
  
      // Assert that the socket.addRoomListener function is called with the expected arguments
      //expect(mockSocket.addRoomListener).toHaveBeenCalledWith(mockSetRoomNum, mockedUsedNavigate);//.toHaveBeenCalled();
    });

    xit('create button click, mock socket', async () => {
      let mockSocket = {
        addRoomListener: jest.fn(),
        send: jest.fn(),
      };
      //let mockNavigate = jest.fn();
      let mockSetRoomNum = jest.fn();
  
      // Mock the useSocket hook to return the mock socket instance
      jest.spyOn(require('./components/SocketProvider'), 'useSocket').mockReturnValue(mockSocket);
      /* let mockedUsedNavigate = jest.fn();
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUsedNavigate,
      })); */
      const navigate = jest.fn();
      //useNavigate.mockReturnValue(navigate);
  
      renderWithContext(<MainPage setRoomNum={mockSetRoomNum} />);
  
      // Assert that the page header is rendered
      expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();
  
      // Assert that the socket.addRoomListener function is called with the expected arguments
      //expect(mockSocket.addRoomListener).toHaveBeenCalledWith(mockSetRoomNum, mockedUsedNavigate);//.toHaveBeenCalled();
    });
  
    xit('renders correctly with mock useNavigate', async () => {
      render(<MainPage />);
  
      expect(screen.getByRole('heading', {level: 3})).toHaveTextContent('Welcome to Reed Mahjong!')
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      const joinRoomButton = screen.getByText('Submit');
      expect(joinRoomButton).toBeInTheDocument();
    });
  
    xit('click create game button', async () => {
      
      //const history = createMemoryHistory(); // create a mock history object
      render(
          <MainPage />);
      const createGameButton = screen.getByText('Create a Game!');
      expect(createGameButton).toBeInTheDocument();
      await fireEvent.click(createGameButton);
      await waitFor(() => {
        expect(history.location.pathname).toMatch(/\/room\/\d+/);
        //const roomHeading = getByText('Room'); // get the Room heading
        //expect(roomHeading).toBeInTheDocument(); // check that the Room heading is rendered
      }, { timeout: 5000 }); // increase the timeout if needed
      //expect(screen.getByRole('heading')).toHaveTextContent('Room');
    });
  });
});
/* // mock useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// mock useNavigate hook
const mockedUsedSocket = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useSocket: () => mockedUsedSocket,
}));

// Create a mock implementation of the WebSocket instance
const mockWebSocket = {
  send: jest.fn(),
  addRoomListener: jest.fn(),
  close: jest.fn(),
};

// Mock the implementation of the SocketContext provider
jest.mock('./SocketProvider', () => ({
  SocketProvider: {
    Consumer: ({ children }) => children(mockWebSocket),
  },
}));

test('useSocket returns the correct socket instance', () => {
  const { result } = renderHook(() => useSocket());
  expect(result.current).toBe(mockWebSocket);
}); */

/* jest.mock('./components/SocketProvider', () => ({
  useSocket: jest.fn(),
})); */

/* xdescribe('MainPage Mock', () => {
  test('renders main page correctly', () => {
    const mockSocket = {
      addRoomListener: jest.fn(),
    };
    const mockNavigate = jest.fn();
    const mockSetRoomNum = jest.fn();

    // Mock the useSocket hook to return the mock socket instance
    jest.spyOn(require('./components/SocketProvider'), 'useSocket').mockReturnValue(mockSocket);
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(<MainPage navigate={mockNavigate} setRoomNum={mockSetRoomNum} />);

    // Assert that the page header is rendered
    expect(screen.getByRole('heading', { name: /Welcome to Reed Mahjong!/i })).toBeInTheDocument();

    // Assert that the CreateRoomButton component is rendered
    expect(screen.getByRole('button', { name: /Create Room/i })).toBeInTheDocument();

    // Assert that the JoinRoom component is rendered
    expect(screen.getByRole('button', { name: /Join Room/i })).toBeInTheDocument();

    // Assert that the socket.addRoomListener function is called with the expected arguments
    expect(mockSocket.addRoomListener).toHaveBeenCalledWith(mockSetRoomNum, mockNavigate);
  });
});
 */
// wrapper function to render components with context
function renderWithinApp(component) {
  return render(
    <App>{component}</App>
  );
}

function renderWithContext(component){
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
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='/room/:roomid' element={<RoomPage/>}/>
          </Routes>
        </MemoryRouter>
      </SocketProvider>
    </UsernameProvider>
  );
};

/* xdescribe("<Navigate> with test renderer", () => {
  describe("with an absolute href", () => {
    xit("navigates to the correct test URL", () => {
      let renderer: TestRenderer.ReactTestRenderer;
      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <UsernameProvider>
            <SocketProvider>
            <MemoryRouter initialEntries={["/test"]}>
            <Routes>
              <Route path='/' element={<MainPage />}/>
              <Route path='/test' element={<h1>About</h1>}/>
              <Route path='/room/:roomid' element={<RoomPage/>}/>
            </Routes>
          </MemoryRouter>
            </SocketProvider>
          </UsernameProvider>
          
        );
      });

      expect(renderer.toJSON()).toMatchInlineSnapshot(`
        <h1>
          About
        </h1>
      `);
    });

    xit("navigates to the correct main URL", () => {
      let renderer: TestRenderer.ReactTestRenderer;
      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <UsernameProvider>
            <SocketProvider>
              <MemoryRouter initialEntries={["/"]}>
                <Routes>
                  <Route path='/' element={<MainPage />}/>
                  <Route path='/test' element={<h1>About</h1>}/>
                  <Route path='/room/:roomid' element={<RoomPage/>}/>
                </Routes>
              </MemoryRouter>
            </SocketProvider>
          </UsernameProvider>
          
        );
      });


      expect(renderer.root.findByProps({className: 'createRoomButton'}).children[0].props.type).toBe('button');
      //console.log(renderer.root.findAllByType(CreateRoomButton).type);
      //console.log(renderer.root.findByType('div').children);
      console.log(renderer.toJSON())
    });
  });
}) */



xtest('loads and displays greeting', async () => {
  // ARRANGE
  //render(<Fetch url="/room/000/" />)

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('Welcome')
  //expect(screen.getByRole('button')).toBeDisabled()
})