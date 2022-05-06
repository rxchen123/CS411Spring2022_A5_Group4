import React, { useState, useEffect } from "react";
import axios from "axios";


//props not needed w/out token
function Register() {

    const [registerForm, setregisterForm] = useState({
        email: "",
        password: ""
    })

    function registerFunc(event) {
        axios({
            method: "POST",
            url: "http://localhost:5000/register",
            data: {
                email: registerForm.email,
                password: registerForm.password
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })

        setregisterForm(({
            email: "",
            password: ""
        }))

        event.preventDefault()
    }
    
    function handleChange(event) {
        const { value, name } = event.target
        setregisterForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }
            
    return (
        <div>
            <h1>Create an account</h1>
            <p></p>
            <form className="register">
                <input onChange={handleChange}
                    type="email"
                    text={registerForm.email}
                    name="email"
                    placeholder="Email"
                    value={registerForm.email} />
                <input onChange={handleChange}
                    type="password"
                    text={registerForm.password}
                    name="password"
                    placeholder="Password"
                    value={registerForm.password} />

                <button onClick={registerFunc}>Submit</button>
            </form>
            <h1>
                <a href="/">Home</a>
            </h1>
        </div>
    );
}


{/*
class Register extends React.Component {
  render() {
    return (
      <div>
        <title>TravelHelper</title>
        {"{"}%if message%{"}"}
        <h4>
          {" "}
          {"{"}
          {"{"}message{"}"}
          {"}"}{" "}
        </h4>
        {"{"}% endif %{"}"}
        <div className="title">
          <h1> Create an Account </h1>
        </div>
        <div id="content">
          <form method="post" action="{{ url_for('register_user') }}">
            <label htmlFor="email">email:</label>
            <input type="text" name="email" />
            <br />
            <label htmlFor="password">password:</label>
            <input type="text" name="password" />
            <br />
            <input type="submit" />
          </form>
        </div>
        <h1>
          <a href="/">Home</a>
        </h1>
      </div>
    );
  }
}*/}

export default Register;
