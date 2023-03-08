# Mahjong

TODO (03.03):
1. For frontends:

	(1) In the home page, I have implemented 2 buttons. For "Create a room!" button, we want the home page sends back signal to the backends when the users press the button. The backends will generate a random string and add new url into urls.py.

	(2) I am implementing the frontend in a React framework under ```frontend``` folder. After it is completed, it should contain all the contents under ```static``` and ```template``` folders, and those folders can be deleted.  

2. For backends:

	(1) Figure out how do we present the tiles to the users.
	
	(2) How many objects do we need (game, consumer, ... )?
	
	(3) Rules of Mahjong.

Useful Resourse:
1. https://codyparker.com/django-channels-with-react/2/
2. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

How to test:
1. Install Django
2. cd Reed_Mahjong
3. python3 manage.py migrate
4. python3 manage.py runserver

How to test frontend:
1. Install Node.js
2. cd Reed_Mahjong
3. cd frontend
4. npm install (this installs all dependencies from package.json)
5. npm start 
