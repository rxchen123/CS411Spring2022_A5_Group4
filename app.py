import flask
from flask import Flask
import ApiCalls

app = Flask(__name__)


@app.route('/')
def index():
    return '''<h1>Welcome to the home page! Not much going on here...</h1>'''

@app.route('/hotelsearch', methods=['GET', 'POST'])
def searchHotels():
    if flask.request.method == 'GET':    
        return '''
                <h3>Search for the top 5 hotels in any US city!</h3>
            	<form action='login' method='POST'>
				    <input type='text' name='city' id='city' placeholder='city'></input>
                    <p>Enter the dates in the form YYYY-MM-DD
				    <input type='text' name='check-in Date' id='checkinDate' placeholder='checkinDate'></input>
                    <input type='text' name='check-out Date' id='checkoutDate' placeholder='checkoutDate'></input>
   				    <input type='text' name='Number of Adults' id='numAdults' placeholder='numAdults'></input>

				    <input type='submit' name='submit' value='Search!'></input>
			   </form></br>
            '''
    
    city = flask.request.form['city']        
    checkinDate = flask.request.form['checkinDate']
    checkoutDate = flask.request.form['checkoutDate']
    numAdults = flask.request.form['numAdults']
    return ApiCalls.hotelSearch(numAdults,checkinDate,checkoutDate,city)
        
        # need to display a simple form, then the results once the form is submitted




if __name__ == '__main__':
    app.run(debug=True)

