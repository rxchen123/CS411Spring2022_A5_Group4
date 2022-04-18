To set up the MySQL DB, do the following:
	1. install XAMPP (if necessary, see: https://www.askpython.com/python-modules/flask/flask-mysql-database)
	2. Launch XAMPP. Under the 'Manager Servers' tab, start the 'MySQL Database' and 'Apache Web Server'
	3. Open a web browser and go to 'localhost'
	4. Go to on 'phpMyAdmin' (located in the menu bar on the top of the page)	
	5. Go to the 'SQL' tab and copy the relevant commands from 'schema.sql' into the box. Click go. 
	6. [Optional]: To initialize some users, run the INSERT commands at the bottom.

To run the flask application:
	1. [Optional]: create a virtual environment (you really should do this!)
		- if using anaconda/miniconda run 'conda create --name travelhelper python=3.6.7' in the terminal
		- enter the environment by running 'conda activate travelhelper'
	2. install all necessary packages 'pip install -r requirements.txt' (or use pip3)
	3. export flask (not sure if this is needed or not?)
		- (Mac, Linux) 'export FLASK_APP=app.py'
		- (Windows) 'set FLASK_APP=app.py'
	4. in the terminal, run the app 'python -m flask run' (or use python3)
	5. open a web browswer and go to 'localhost:5000'