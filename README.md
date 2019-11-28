# VMS

### Tech Stack

The System uses a number of open source projects to work properly:

* Django - BackEnd
* React - FrontEnd

### Installation

Install MongoDB

```sh
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ sudo apt-get install gnupg
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
$ sudo apt-get update
```

Run MongoDB
```sh
$ sudo service mongod start
```
Create the Virtual Env
```sh
$ python3 -m venv env
$ source env/bin/activate
```
And in the virtual Env
Run Backend
```sh
$ pip3 install -r requirments.txt
$ python3 manage.py makemigrations
$ python3 manage.py migrate
$ python3 manage.py runserver
```

Run Frontend
```sh
$ npm install
$ npm start
```
