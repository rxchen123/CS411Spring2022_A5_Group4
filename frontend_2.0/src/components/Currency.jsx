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
    <div className="home">
      <br/>
      <div align="center">
        <div class="col-lg-5">
          <h1 class="font-weight-light">Currency Converter</h1>
          <p>
            Here is where you convert currency
          </p>
        </div>
      </div>
    
      <br/><br/>
    {/* App link */}
    <div className="container" align="center">
      <CurrencyCalcLink />
    </div>

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