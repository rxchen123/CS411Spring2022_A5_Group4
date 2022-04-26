import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Signin.css";

function Signin() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    email: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className = "label"> Email</label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="input-container">
          <label className = "label">Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="signin">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
          <h1 class="font-weight-light">Sign in here: </h1>
            <div className="app">
            <div className="login-form">
              {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
          </div>
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Signin />, rootElement);
export default Signin;