###############################################################################
# some code adapted from:					  								  #
# https://www.askpython.com/python-modules/flask/create-hello-world-in-flask  #								
# https://www.askpython.com/python-modules/flask/flask-mysql-database         #
# flask-login: https://github.com/maxcountryman/flask-login/	              #
# 			   https://flask-login.readthedocs.io/en/latest/		          #
###############################################################################

from crypt import methods
import flask
from flask import Flask, Response, request, render_template, redirect, url_for
from flaskext.mysql import MySQL
import flask_login
import sys

mysql = MySQL()
app = Flask(__name__)
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

# create a cursor to interact with the MySQL Databse
conn = mysql.connect()
cursor = conn.cursor()

# fetch an initial list of all users
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

# handle unauthorized actions (shouldn't see this usually, session timeouts maybe?? NOT SURE)
@login_manager.unauthorized_handler
def unauthorized_handler():
	return render_template('unauth.html')

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
	pwd = str(data[0][0])
	user.is_authenticated = request.form['password'] == pwd
	return user

@app.route('/login', methods=['GET', 'POST'])
def login():
	if flask.request.method == 'GET':
		return render_template('login.html')
		
	else: # request method is POST 
		email = flask.request.form['email']
		cursor = conn.cursor()
		
		# check if email is registered
		if cursor.execute("SELECT password FROM Users WHERE email = '{0}'".format(email)):
			data = cursor.fetchall()
			pwd = str(data[0][0])
			
			if flask.request.form['password'] == pwd:
				user = User()
				user.id = email
				flask_login.login_user(user) # password is correct, login the user
				#re-direct user to logged-in version of the home page
				return flask.redirect(flask.url_for('protected')) # protected is a function defined in this file

	# information did not match
	return render_template("login.html", message='Please try again.')
	
# specific methods (GET/POST) can be specified in the function header instead of inside the functions 
@app.route("/register", methods=['GET'])
def register():
	return render_template('register.html')

# handle a normal failed registration  
@app.route("/re-register", methods=['GET'])
def re_register():
	return render_template('register.html', message='Please try again.')

# handle a failed registration because of an invalid email 
@app.route("/bad-email", methods=['GET'])
def bad_email():
	return render_template('register.html', message='Email in use! Please try again.')

@app.route("/register", methods=['POST'])
def register_user():
	global users
	users = getUserList()
	try:
		email=request.form.get('email')
		password=request.form.get('password')

		if len(password) < 1 or len(email) < 1:
			print('invalid email and/or password')
			# can't render_template here after failed login, must use redirect. Not sure why.
			return flask.redirect(flask.url_for('re_register'))
	except:
		print("couldn't find all tokens") # all print statements go to shell (invisible to user)
		return flask.redirect(flask.url_for('re_register'))

	cursor = conn.cursor()
	test = isEmailUnique(email)

	if test:
		# user didn't enter a email and/or password
		print(cursor.execute("INSERT INTO Users (email, password) VALUES ('{0}', '{1}')".format(email, password)))
		conn.commit()

		# successful registration, log the user in and redirect to the home page
		user = User()
		user.id = email
		flask_login.login_user(user)
		# but I can render template here after a successful registration? Not sure why. (See above for context)
		return render_template('index.html', name=email, message='Account Created!')

	# email is already in use
	else:
		print("couldn't find all tokens")
		return flask.redirect(flask.url_for('bad_email'))

def isEmailUnique(email):
	""" check if a user has already registered an email """

	cursor = conn.cursor()

	#if there are > 0 entries with this email
	if cursor.execute("SELECT email FROM Users WHERE email = '{0}'".format(email)):
		return False
	else:
		return True

# render the home page when logged in
@app.route('/home')
@flask_login.login_required # this decorator specifies that /home requires users to be logged in
def protected():
	return render_template('index.html', name=flask_login.current_user.id)

# render the home page when not logged in
@app.route("/", methods=['GET'])
def hello():
	return render_template('index.html', message='Welecome to TravelHelper!')

# logout and render the post-log-out home page
@app.route('/logout')
def logout():
	flask_login.logout_user() # logout 
	return render_template('index.html', message='Successfully Logged Out', logout=True)

# render the profile page (must be logged in) 
@app.route('/profile')
@flask_login.login_required # this decorator specifies that /home requires users to be logged in
def profile():
	return render_template('profile.html', name=flask_login.current_user.id)

# render the trips page (must be logged in) 
@app.route('/trip', methods=['GET'])
@flask_login.login_required 
def trip():
	email = flask_login.current_user.id
	print(getTrips(email), file=sys.stdout)
	return render_template('trip.html', name=email, trips=getTrips(email))

@app.route('/valid-trip', methods=['GET'])
@flask_login.login_required 
def valid_trip():
	email = flask_login.current_user.id
	return render_template('trip.html', name=email, trips=getTrips(email), message='Trip created!')


@app.route('/invalid-trip', methods=['GET'])
@flask_login.login_required 
def invalid_trip():
	email = flask_login.current_user.id
	return render_template('trip.html', name=email, trips=getTrips(email), message='It looks like this trip already exists!')

@app.route('/trip', methods=['POST'])
@flask_login.login_required 
def add_trip():
	try:
		email = flask_login.current_user.id
		hotel = request.form.get('hotel')
		restaurant = request.form.get('restaurant')
		cursor = conn.cursor()
		cursor.execute("INSERT INTO Trips (uemail, hotel, restaurant) VALUES (%s, %s, %s )", (email, hotel, restaurant))
		print("INSERTED (%s, %s, %s) into TRIPS"%(email, hotel, restaurant), file=sys.stdout)
		conn.commit()
		return flask.redirect(flask.url_for('valid_trip'))
	except:
		return flask.redirect(flask.url_for('invalid_trip'))


def getTrips(email):
	""" get all of a user's trips """

	cursor = conn.cursor()
	cursor.execute("SELECT hotel, restaurant FROM Trips WHERE uemail = '{0}'".format(email))
	return cursor.fetchall() # note: return a list of tuples, [(hotel, restaurant)]

# start up the backend on port 5000
if __name__ == "__main__":
	app.run(port=5000, debug=True)
