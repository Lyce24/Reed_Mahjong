
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

import App from './App';
import MainPage from './components/MainPage';
import RoomPage from './components/RoomPage';
import CreateRoomButton from './components/CreateRoomButton';

// test app renders correctly with context
xdescribe('App component', () => {
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

xdescribe('MainPage Mock', () => {
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

function renderWithURL(route) {
  //const history = createMemoryHistory({ initialEntries: [route] });

  /* let renderer: TestRenderer.ReactTestRenderer;
  TestRenderer.act(() => {
    renderer = TestRenderer.create(
      <UsernameProvider>
        <SocketProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path='/' element={<MainPage />}/>
              <Route path='/room/:roomid' element={<RoomPage/>}/>
            </Routes>
          </MemoryRouter>
        </SocketProvider>
      </UsernameProvider>
    )}); */

    //return renderer;


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

xdescribe("<Navigate>", () => {
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

    it("navigates to the correct main URL", () => {
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
})

xdescribe('Main Page component', () => {
  it('renders correctly with context and router', async () => {
    renderWithContext(<MainPage />);

    expect(screen.getByRole('heading',)).toHaveTextContent('Welcome to Reed Mahjong!')
    const createGameButton = screen.getByText('Create a Game!');
    expect(createGameButton).toBeInTheDocument();
    const joinRoomButton = screen.getByText('Submit');
    expect(joinRoomButton).toBeInTheDocument();
    expect(location.pathname).toBe('/');
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

describe('Room Page component', () => {
  it('renders without crashing, null room id', async () => {
    renderWithContext(<RoomPage />);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Room');
  });

  it('renders with room id 123', async () => {
    //renderWithContext(<RoomPage />);
    const roomid = 123;
    const { container } = renderWithURL('/room/123');
  
    console.log('current URL👉️', window.location.href);
    console.log('URL', location.pathname);
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Room 123');
    //await waitFor(() => {screen.getByRole('heading', {level: 1})}, { timeout: 5000 });
    expect(container.querySelector('h1')).toHaveTextContent(`Room ${roomid}`);
  });
});

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