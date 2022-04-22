import React from 'react';
import image1 from './images/travel_1.png';
import './index.css'
  
const Home = () => {
  return (
    <div>
        <h1>Welcome to the Itinerary Generator!</h1>
        <h2>Sign up or log in to start planning your trip today!</h2>
        <img src= {image1} alt = "Travel" class ="center"></img>
    
    </div>
  );
};
  
export default Home;