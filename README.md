## Installation

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

### Todo

Frontend

- Populate room page
  - Implement discard pile at center
  - Implement methods to draw and discard tile
  - Implement methods to organize player tiles
  - Playerboard and otherboard layout within gameboard (done)
  - Tile layout within playerboard and gameboard (done)
  - Make tiles clickable (done)
  - Implement Tile face up vs face down (done)
- Get image resources
  - Get tile images (done)
