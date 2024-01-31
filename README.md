# Reedies' Mahjong Web Game

This is a web-based Mahjong game developed using Django and React.

## Description

The Reedies' Mahjong Web Game allows players to enjoy the classic game of Mahjong online. It provides a user-friendly interface where players can create or join rooms, play against each other, and experience the excitement of this popular tile-based game.

## Features

- Create and join game rooms
![Demo2](https://github.com/Lyce24/Reed_Mahjong/assets/89893105/46fd1101-88ba-4a56-954d-0aa8a77b4c65)

- Support for multiple simultaneous games and real-time multiplayer gameplay with an intuitive and responsive user interface
![Demo6](https://github.com/Lyce24/Reed_Mahjong/assets/89893105/01d00655-fa55-4a3a-aacf-8f87c486dfbf)

- Alerts for possible moves like 'peng' and 'chi', offering players strategic choices.
![Demo4](https://github.com/Lyce24/Reed_Mahjong/assets/89893105/a7453db7-936f-48f3-ba8c-451ed8ea9d9a)

- Discard, declare pong, chi, and other essential Mahjong actions with automatic tile shuffling and dealing
![Demo3](https://github.com/Lyce24/Reed_Mahjong/assets/89893105/3bcaa802-1990-45a4-b0c4-eb420714de28)

## Technology Stack

- Django: Backend framework for handling game logic and communication
- React: Frontend library for building interactive user interfaces
- WebSockets: Real-time communication between the server and clients
- HTML/CSS: Markup and styling for the game interface
- SQLite3: Database system for storing game data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lyce24/Reed_Mahjong.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Reed_Mahjong
   ```

3. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

5. Set up the database:

   ```bash
   cd ../App
   python manage.py migrate
   ```

6. Start the development server:

   ```bash
   cd ..
   python manage.py runserver
   ```

7. In a separate terminal, navigate to the frontend directory and start the React development server:

   ```bash
   cd frontend
   npm start
   ```

8. Access the Mahjong Web Game in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Create a new game room or join an existing room by entering the room code.
2. Wait for other players to join the room.
3. Once all players are ready, start the game (Need 4 players in order to start the game).
4. Follow the on-screen instructions to play Mahjong.
5. Enjoy the game and have fun!

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- The game logic and rules are based on the traditional Mahjong game (Sichuan Mahjong).
- Special thanks to the Django and React communities for their amazing frameworks and libraries.

## Contact

For any inquiries or questions, please contact [liue@reed.edu](mailto:liue@reed.edu).
