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
1. https://codyparker.com/django-channels-with-react/2/ (skip this)
2. https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
3. https://blog.logrocket.com/using-react-django-create-app-tutorial/ 
4. https://reactjs.org/tutorial/tutorial.html 

How to test frontend:
1. Install Node.js
2. cd Reed_Mahjong
3. cd frontend
4. npm install (this installs all dependencies from package.json)
5. npm start (this serves the frontened webpage at localhost:3000)

### Todo

Frontend

- Populate room page
  - Create tile component
  - Create game board component