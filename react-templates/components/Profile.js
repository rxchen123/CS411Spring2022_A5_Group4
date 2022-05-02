import React from "react";

class Profile extends React.Component {
  render() {
    return (
      <div>
        <title>TravelHelper</title>
        {"{"}% if name %{"}"}
        <h1>
          User: {"{"}
          {"{"} name {"}"}
          {"}"}
        </h1>
        <h1>Change Password: TBA</h1>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/trip">Trips</a>{" "}
          </li>
          <li>
            <a href="/logout">Logout</a>{" "}
          </li>
        </ul>
        {"{"}% else %{"}"}
        <h1>You are logged out.</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>{" "}
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </ul>
        {"{"}% endif %{"}"}
      </div>
    );
  }
}

export default Profile;
