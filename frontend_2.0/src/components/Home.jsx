import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div className="home">
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
            <h1 class="font-weight-light">Home</h1>
            <p>
              TripHelper helps you plan a trip using a specific location, budget, and timeframe. It connects to (these API's)
              and helps do all of the searching for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;