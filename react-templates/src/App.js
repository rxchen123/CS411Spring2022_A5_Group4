import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Trip from "./components/Trip";
import Unauth from "./components/Unauth";
import useToken from "./components/useToken";
import Navigation from "./components/Navigation";
import {NavLink} from "react-router-dom";
import LogoutButton from "./components/Logout";
import { Outlet, Link } from "react-router-dom";

//<Navigation />
//<Footer />

function App(){   
    const { token, removeToken, setToken } = useToken();  
    return(
    <Router>
        <div>
        <Navigation/>
        <LogoutButton token={removeToken}/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login setToken={setToken}/>}></Route>)
        <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/logout" token={removeToken} element={<Home />} />
        <Route exact path="/trip" element={<Trip token={token} setToken={setToken}/>}>
        </Route>
        </Routes>
        
        </div>
    </Router>
    );
}

export default App;
/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals