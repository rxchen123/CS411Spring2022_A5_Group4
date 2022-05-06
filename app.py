###############################################################################
# some code adapted from:					  								  #
# https://www.askpython.com/python-modules/flask/create-hello-world-in-flask  #								
# https://www.askpython.com/python-modules/flask/flask-mysql-database         #
# flask-login: https://github.com/maxcountryman/flask-login/	              #
# 			   https://flask-login.readthedocs.io/en/latest/		          #
###############################################################################

import flask
import json
from flask import Flask, Response, request, render_template, redirect, url_for, jsonify
from flaskext.mysql import MySQL
import flask_login
import sys
from flask_cors import CORS, cross_origin

#flask_jwt_extended: tokens for logging in and out
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import unset_jwt_cookies

mysql = MySQL()
app = Flask(__name__)
app.secret_key = 'secret!!'  
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# connecting Flask with MySQL
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'travelhelper'
#app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
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

# initialize jwt manager
app.config["JWT_SECRET_KEY"] = "super-secret"  
jwt = JWTManager(app)

def getUserList():
	""" return a list of of all the users """

	cursor = conn.cursor()
	cursor.execute("SELECT email from Users")
	return cursor.fetchall()


# default User class (inherits from User.Mixin with default implementations of fields/methods)
class User(flask_login.UserMixin):
	pass

# user loader callback: reloads user object from user-id stored in the session.
# (essentially a 're-login' but to the user it looks like they are in a sesion)
# must take in a string id of a user and return the corresponding user object
@login_manager.user_loader
def user_loader(email):
	global users
	users = getUserList()
	if not(email) or email not in str(users):
		return
	user = User()
	user.id = email
	return user

#handle unauthorized actions (shouldn't see this usually, session timeouts maybe?? NOT SURE)
#@login_manager.unauthorized_handler
#def unauthorized_handler():
#	return render_template('unauth.html')

# reuqest loader: for logins without cookies (e.g. the initial login from a login form)
@login_manager.request_loader
def request_loader(request):
	global users
	users = getUserList()
	email = request.json.get('email',None)
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

@app.route('/login', methods=['POST'])
def login():
	cursor = conn.cursor()
	# check if email is registered

	email = request.json.get("email", None)
	if cursor.execute("SELECT password FROM Users WHERE email = '{0}'".format(email)):
		data = cursor.fetchall()
		pwd = str(data[0][0])
			
		if request.json.get("password",None) == pwd:
			# user = User()
			# user.id = email
			# flask_login.login_user(user) # (DO WE NEED THIS STILL?)

			return {
        		'email' : email,
				'login' : 1, 
				'message': 'Successful login.',
				'access_token': create_access_token(identity=email)
    		}			

	# information did not match
	return {
        'email' : email,
		'login' : 0, 
		'message': 'Please try again.',
	}, 401
	
@app.route("/register", methods=['POST'])
def register_user():
	global users
	users = getUserList()
	try:
		email=request.json.get("email",None)
		password=request.json.get("password",None)

		if len(password) < 1 or len(email) < 1:
			print('invalid email and/or password')

			return {
        		'email' : '',
				'register' : 0, 
				'message': 'invalid email and/or password.'
    		}	
	except:
		print("couldn't find all tokens") # all print statements go to shell (invisible to user)

		return {
        	'email' : '',
			'register' : 0, 
			'message': 'couldn\'t find all tokens'
    	}	

	cursor = conn.cursor()
	test = isEmailUnique(email)

	if test:
		# user didn't enter a email and/or password
		print(cursor.execute("INSERT INTO Users (email, password) VALUES ('{0}', '{1}')".format(email, password)))
		conn.commit()

		# successful registration, log the user in 
		user = User()
		user.id = email
		# flask_login.login_user(user)
		
		return {
        	'email' : email,
			'register' : 1, 
			'message': 'Account created!',
			'access_token': create_access_token(identity=email)
    	}	
	# email is already in use
	else:
		print("bad email")
		return {
        	'email' : '',
			'register' : 0, 
			'message': 'Email already in use! Please try again.' 
    	}	

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
# @flask_login.login_required # this decorator specifies that /home requires users to be logged in
@jwt_required()
def protected():
	email = get_jwt_identity()
	return {
        'email' : email
    }, 200	

# logout and render the post-log-out home page
@app.route('/logout', methods=['POST'])
def logout():
	# flask_login.logout_user() # STILL NEEDED? 
	response = jsonify({"msg": "logout successful"})
	unset_jwt_cookies(response)
	return response
 
@app.route('/profile')
# @flask_login.login_required # this decorator specifies that /profile requires users to be logged in
@jwt_required()
def profile():
	email = get_jwt_identity()
	return {
        'email' : email,
    }	

@app.route('/trip', methods=['GET'])
# @flask_login.login_required NOT NEEDED
@jwt_required()
def trip():
	# email = flask_login.current_user.id # NOT NEEDED
	email = get_jwt_identity() # This should work!!
	print(getTrips(email), file=sys.stdout)
	return {
		'trips': getTrips(email)
    }	
	# return render_template('trip.html', name=email, trips=getTrips(email))

@app.route('/trip', methods=['POST'])
# @flask_login.login_required NOT NEEDED
@jwt_required()
def add_trip():
	try:
		# email = request.json.get("email", None)
		email = get_jwt_identity()
		hotel = request.json.get("hotel", None)
		restaurant = request.json.get('restaurant', None)
		cursor = conn.cursor()
		cursor.execute("INSERT INTO Trips (uemail, hotel, restaurant) VALUES (%s, %s, %s )", (email, hotel, restaurant))
		print("INSERTED (%s, %s, %s) into TRIPS"%(email, hotel, restaurant), file=sys.stdout)
		conn.commit()
		return {
    		'email' : email,
			'trips': getTrips(email),
			'message' : 'Trip created!'
    	}	
	except:
		return {
    		'email' : email,
			'trips': getTrips(email),
			'message' : 'It looks like this trip already exists!'
    	}


def getTrips(email):
	""" get all of a user's trips """

	cursor = conn.cursor()
	cursor.execute("SELECT hotel, restaurant FROM Trips WHERE uemail = '{0}'".format(email))
	return cursor.fetchall() # note: return a list of tuples, [(hotel, restaurant)]

# start up the backend on port 5000
if __name__ == "__main__":
	app.run(port=5000, debug=True)
