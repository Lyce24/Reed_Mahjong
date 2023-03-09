Start backend:

1. `pip install pipenv`
2. `pipenv shell`
3. `pipenv install django djangorestframework django-cors-headers`
4. `python manage.py runserver`

When updating Model:

1. `python manage.py makemigrations`
2. `python manage.py migrate`

If we want to run certain operation after migrating, run:

`python manage.py makemigrations --empty --name some_model App`

then run `python manage.py migrate` again.
