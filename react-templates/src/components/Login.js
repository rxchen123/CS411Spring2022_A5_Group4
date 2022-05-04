import React, { useState, useEffect } from "react";
import axios from "axios";

//props not needed w/out token
function Login() {

    const [loginForm, setloginForm] = useState({
        email: "",
        password: ""
    })

    function logMeIn(event) {
        axios({
            method: "POST",
            url: "http://localhost:5000/login",
            data: {
                email: loginForm.email,
                password: loginForm.password
            }
        })
            .then(response => {
                console.log("test");
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })

        setloginForm(({
            email: "",
            password: ""
        }))

        event.preventDefault()
    }

    function handleChange(event) {
        const { value, name } = event.target
        setloginForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }
            
    return (
        <div>
            <h1>Login</h1>
            <form className="login">
                <input onChange={handleChange}
                    type="email"
                    text={loginForm.email}
                    name="email"
                    placeholder="Email"
                    value={loginForm.email} />
                <input onChange={handleChange}
                    type="password"
                    text={loginForm.password}
                    name="password"
                    placeholder="Password"
                    value={loginForm.password} />

                <button onClick={logMeIn}>Submit</button>
            </form>
        </div>
    );
}

export default Login;
