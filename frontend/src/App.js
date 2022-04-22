import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
}
from "react-router-dom";
import CurrencyCalc from './CurrencyCalc.js';

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response=> {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error=> {
      console.log(error)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-Header">
        
        <img src={logo} className = "App-logo" alt="logo" />
        <p>React + Flask Tutorial</p>
        <div>{getMessage.status === 200 ?
          <h3>{getMessage.data.message}</h3>
          :
          <h3>LOADING</h3>}</div>  
        <p>test</p>      
        <CurrencyCalcLink/>
      </header>  
    </div>
  )
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
    
export default App;
