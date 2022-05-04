import React, { useEffect, useState } from "react";
import axios from 'axios';


// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
console.log("test")

//grab from sql
//message, name, logout
//React component names must start with an uppercase letter, React Hook names must start with "use"
function SqlMessage() {
    const [getMessage, setGetMessage] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/').then(response => {
        console.log("SUCCESS", response)
        setGetMessage(response)
        }).catch(error => {
          console.log(error)
        })
    }, [])

    useEffect(() => {
        fetch('/hello').then(res => res.json()).then(data => {
            setGetMessage(data.result);
        });
    }, []);
}

class Home extends React.Component {
  render() {
    return (
      <div className="index">
            <title>TravelHelper</title>
            {/*if we have a message*/}
            {/*{"{""%" if message "%""}"}*/}
            {/*<h4> {{ message }}</h4>*/}
            {/*{"{"}% endif %{"}"}*/}
            {/*if we have a name*/}
            {/*{"{"}% if name %{"}"}*/}
                <h1>
                You are logged in as: {/*{"{"}{"{"} name {"}"}{"}"}*/}
                </h1>
                <ul>
                    <li>
                    <a href="/profile">Profile</a>
                    </li>
                    <li>
                    <a href="/trip">Trips</a>
                    </li>
                    <li>
                    <a href="/logout">Logout</a>
                    </li>
                </ul>
                {/*if we don't have a name*/}
            {/*{"{"}% else %{"}"}*/}           
            {/*{"{"}%if logout%{"}"}*/}
        <h1>
        <a href="/">Home</a>
        </h1>
            {/*if we don't have a message*/}
            {/*{"{"}% else %{"}"}*/}
        <h1>
        <a href="/login">Login</a>
        </h1>
        <h1>
          <a href="/register">Register</a>
        </h1>
            {/*{"{"}% endif %{"}"}*/}
            {/*{"{"}% endif %{"}"}*/}
      </div>
    );
  }
}

export default Home;
