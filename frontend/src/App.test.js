//import { render, screen } from '@testing-library/react';
//import App from './App';

/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */


import React from 'react';
import { render } from '@testing-library/react';
import { UsernameProvider } from './components/UsernameProvider';
import { SocketProvider } from './components/SocketProvider';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <UsernameProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UsernameProvider>
    );
  });
});