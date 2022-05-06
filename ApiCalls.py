import requests

apiKey = ""
apiSecret = ""
accessToken = ""

def getAccessToken():
    """Generate an access token with a POST request to Amadeus Auth server"""
    headers={"Content-Type": "application/x-www-form-urlencoded"}
    data = {"grant_type":"client_credentials","client_id":apiKey,"client_secret":apiSecret}
    response = requests.post("https://test.api.amadeus.com/v1/security/oauth2/token", headers=headers, data=data)
    response = response.json()
    response = response.get("access_token")
    return response


def latLon(city):
    url="http://api.positionstack.com/v1/forward"
    params = {"access_key":"15d82902cde69dd5818d355a57298704", "query":city}
    response = requests.request("GET", url, params=params)
    response = response.json().get("data")[0]
    return response



def hotelSearch(numAdults, checkinDate, checkoutDate, city):
    """Perform HTTP request for hotels in an area based on form data"""

    coords = latLon(city)
    lat = coords.get("latitude")
    lon = coords.get("longitude")

    url = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby"
    querystring = {"locale":"en_US","adults_number":numAdults,"checkin_date":checkinDate,"sort_order":"STAR_RATING_HIGHEST_FIRST",
                "checkout_date":checkoutDate,"longitude":lon,"currency":"USD","latitude":lat}
    headers = {
	"X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
	"X-RapidAPI-Key": "20192985damsh3bb2f7d1cb25fcap1588dejsn5ccf9a34cb3b"
    }
    response = requests.request("GET", url, headers=headers, params=querystring)
    response=response.json().get("searchResults").get("results")[:5]    #first 5 results based on criteria
    hotels = []
    for hotel in response:
        hotelData = {"name":hotel.get('name'), "address" :hotel.get('address').get('streetAddress'), "price_per_night":hotel.get("ratePlan").get("price").get("current")}
        hotels.append(hotelData)
    
    print(hotels)

if __name__ == "__main__":
    hotelSearch("2","2023-04-25","2023-05-06","Malibu")
