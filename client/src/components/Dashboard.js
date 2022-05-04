import React, {useState, useEffect} from 'react';

function Dashboard() {

  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch("/trips").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="dashboard">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Your Trips</h1>
            <p>
              {(typeof data.trips === 'undefined') ? (
                <p> Loading... </p>
                  ) : (
                data.trips.map((trip, i) => (
                  <p key={i}>{trip}</p>
              ))
            )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;