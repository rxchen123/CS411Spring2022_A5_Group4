import React from "react";

class Unauth extends React.Component {
  render() {
    return (
      <div>
        <title> TravelHelper</title>
        <h1>You are not logged in! </h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Unauth;
