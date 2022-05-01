import React, { useEffect, useState }  from 'react';
import './Currency.css';
import CurrencyCalc from './CurrencyCalc.js';
import "./CurrencyCalc.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
}
from "react-router-dom";



function Currency() {

  const [getMessage, setGetMessage] = useState({})

  return (
    /* Intro to the page */
    <div>
      <br/>
      <div align="center">
        <div >
          <h1 >Currency Converter</h1>
          <p>
            Here is where you convert currency
          </p>
        </div>
      </div>
    
      <br/><br/>

    {/* App link */}
    <div className="container" align="center">
      
    </div>
      <CurrencyCalcLink />
    </div>
  
  );
}
class CurrencyCalcLink extends React.Component {
  render() {
      return (
          <Router>
              <Routes>
                  <Route path="/" element={<CurrencyCalc/>}></Route>
              </Routes>
          </Router>
      );
  }
}

export default Currency;