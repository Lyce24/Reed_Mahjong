Start backend:

1. `pip install django djangorestframework django-cors-headers`
2. `python3 manage.py runserver`

When updating Model:

1. `python3 manage.py makemigrations`
2. `python3 manage.py migrate`

If we want to run certain operation after migrating, run:

`python3 manage.py makemigrations --empty --name some_model App`

then run `python3 manage.py migrate` again.
