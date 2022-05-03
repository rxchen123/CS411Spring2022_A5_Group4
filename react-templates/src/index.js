import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/index";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Trip from "./components/Trip";
import Unauth from "./components/Unauth";

//<Navigation />
//<Footer />

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/unauth" element={<Unauth />} >
            </Route>
        </Routes>
    </Router>,
    document.getElementById("root")
);

reportWebVitals();
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