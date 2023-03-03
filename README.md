# Mahjong

TODO (03.03):
1. For frontends:

	(1) In the home page, I have implemented 2 buttons. For "Create a room!" button, we want the home page sends back signal to the backends when the users press the button. The backends will generate a random string and add new url into urls.py.

2. For backends:

	(1) Figure out how do we present the tiles to the users.
	
	(2) How many objects do we need (game, consumer, ... )?
	
	(3) Rules of Mahjong.

Useful Resourse:
1. https://codyparker.com/django-channels-with-react/2/

How to test:
1. Install Django
2. cd Reed_Mahjong
3. python3 manage.py migrate
4. python3 manage.py runserver
