import flask 
from flask import Flask, Response, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import flask_login

# create the flask app
app = Flask(__name__)
mysql = MySQL()
app.secret_key = 'secret!!'  

# connecting Flask with MySQL
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'travelhelper'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# flask login 
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

# create a cursor to interact with the MySQL Database and fetch an initial list of all users
conn = mysql.connect()
cursor = conn.cursor()
cursor.execute("SELECT email from Users")
users = cursor.fetchall()

def getUserList():
	""" return a list of of all the users """

	cursor = conn.cursor()
	cursor.execute("SELECT email from Users")
	return cursor.fetchall()

# default User class (inherits from User.Mixin with default implementations)
class User(flask_login.UserMixin):
	pass

# user loader callback: reloads user object from user-id stored in session 
# (essentially a 're-login' but to the user it looks like they are in a sesions)
@login_manager.user_loader
def user_loader(email):
	global users
	users = getUserList()
	if not(email) or email not in str(users):
		return
	user = User()
	user.id = email
	return user

# reuqest loader: for regular logins without cookies
@login_manager.request_loader
def request_loader(request):
	global users
	users = getUserList()
	email = request.form.get('email')
	if not(email) or email not in str(users):
		return
	user = User()
	user.id = email
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT password FROM Users WHERE email = '{0}'".format(email))
	data = cursor.fetchall()
	pwd = str(data[0][0] )
	user.is_authenticated = request.form['password'] == pwd
	return user

def isEmailUnique(email):
	""" check if a user has already registered an email """

	cursor = conn.cursor()

	#if there are > 0 entries with this email
	if cursor.execute("SELECT email FROM Users WHERE email = '{0}'".format(email)):
		return False
	else:
		return True

# getting an update issue with this ... resolve
@app.route('/trips', methods=['GET'])
def trips():
    return {
        'trips' : ["Trip 1", "Trip 2", "Trip 3"]
    }

# start up the backend on port 5000
if __name__ == "__main__":
	app.run(port=5000, debug=True)
