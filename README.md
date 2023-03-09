Start backend:

1. `pip install django djangorestframework django-cors-headers`
2. `python3 manage.py runserver`

When updating Model:

1. `python3 manage.py makemigrations`
2. `python3 manage.py migrate`

If we want to run certain operation after migrating, run:

`python3 manage.py makemigrations --empty --name some_model App`

then run `python3 manage.py migrate` again.

Useful Resourse:
1. https://codyparker.com/django-channels-with-react/2/
2. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
3. https://blog.logrocket.com/using-react-django-create-app-tutorial/ 

How to test frontend:
1. Install Node.js
2. cd Reed_Mahjong
3. cd frontend
4. npm install (this installs all dependencies from package.json)

