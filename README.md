# Development

## Frontend TODO

- Populate room page
  - (**unclaimed**) Display a waiting message when it's not your turn: remove it after receive draw tile message, and add it back after click discard button or time is up
  - Add BGM
  - (**Unclaimed**) After user accepts Chi/Peng prompt, isolate the three tiles to the left side, display for all players (need backend to send all three tiles)
  - (**Unclaimed**) Create a button in room page that displays the game rules when player hovers over it
  - (**Unclaimed**) Deactivate all movement after game end msg displays, display restart button
  - (**Unclaimed**) Implement reset game functionality

- Testing framwork
  - (**Louise** in progress) create room and let four players join
  - (**unclaimed**) Display error message from backend on screen if join room ID is invalid format

Completed tasks

- Populate room page
  - (Louise done) Implement discard pile at center
  - (Jacob done) Write rules
- After receiving "draw_tile" json:  
    - (Louise done) Activate discard button. 
    - (Yifang done) Implement 60s wait time: if player doesn't discard, then automatically discard the drawn tile. 
    - (Louise done) Deactive discard button 
  -  (Louise done) Design Chi/Peng prompt component
- After receiving "chi_prompt" json:
    - (Louise done) Display Chi prompt on frontend
    - (Yifang done) Implement 30s wait time, if player doesn't accept prompt, then automatically reject prompt
    - (Louise done) Remove Chi prompt from front end
- (El done) Implement "hu_prompt" json like above

## Game Logic overview 
- (back) Player 1's turn, Backend send "draw_tile_player1" to all players
- (front) Player1 receive "draw_tile_player1", can select a tile to discard on webpage (within 60s), and send "discard_tile" to backend
  - P.S. Other players also receive this, but because they are not player1, don't do anything
- (back) Backend receive "discard_tile", update database, (*), determine who the next player is, send "draw_tile_{nextplayer}" to all players
  - (*) If backend realizes that player2 can chi, send "chi_prompt" to player2
  - (front) Player2 receives "chi_prompt", has the option to accept the prompt and perform chi action on webpage (within 30s), and send "chi_response" to backend
  - (back) Backend receive "chi_response" from player2, update database, determine who the next player is, send "draw_tile_{nextplayer}" to all players

# Installation

* Create a Python virtual environment ```python -m venv .```
* Activate the virtual environment, for example if you're using bash, type ```source bin/activate```
* In that environment, run ```pip install -r requirements.txt```
* Install Django with ```python -m pip install Django```
* Create the local database with ```python manage.py migrate```
* Run Django development server on port 8000 - ```python manage.py runserver```

When updating Model:

1. `python3 manage.py makemigrations`
2. `python3 manage.py migrate`

If we want to run certain operation after migrating, run:

`python3 manage.py makemigrations --empty --name some_model App`

then run `python3 manage.py migrate` again.

Run frontend:
1. Install Node.js
2. cd Reed_Mahjong
3. cd frontend
4. npm install (this installs all dependencies from package.json, only run once unless there are updates)
5. npm start (this serves the frontened webpage at localhost:3000)

Useful Resourse:
1. https://codyparker.com/django-channels-with-react/2/
2. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
3. https://blog.logrocket.com/using-react-django-create-app-tutorial/ 
4. https://reactjs.org/tutorial/tutorial.html 
5. MVC in Django. https://medium.com/shecodeafrica/understanding-the-mvc-pattern-in-django-edda05b9f43f, https://techvidvan.com/tutorials/django-mvc-architecture/
6. Some examples. https://github.com/learningnoobi/django_channels_bingo_game
7. Example with explanation. (WebSockets). https://blog.logrocket.com/django-channels-and-websockets/
8. Django-React WebSockets Example 2: https://blog.logrocket.com/build-chat-application-react-django-channels/
9. Frontend (establish WebSocket connection) Backend (routers + consumers to handle connection) overview: https://www.youtube.com/watch?v=cw8-KFVXpTE


### Template code for using socket in frontend

```
// In component
import { useState } from 'react';
import { useSocket } from './SocketProvider';

const socket = useSocket();


socket.send(JSON.stringify({
  'type': 'specific_action'
}));

// In Socket provider addListener() method
// Add desired behavior upon receiving backend message
```
