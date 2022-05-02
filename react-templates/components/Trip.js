import React from "react";

class Trip extends React.Component {
  render() {
    return (
      <div>
        <title>TravelHelper</title>
        {"{"}% if name %{"}"}
        {"{"}% if message %{"}"}
        <h4>
          {"{"}
          {"{"}message{"}"}
          {"}"}
        </h4>
        {"{"}% endif %{"}"}
        <h1>Create a Trip!</h1>
        <div id="trip">
          <form method="post" action="{{ url_for('add_trip') }}">
            <label htmlFor="hotel">choose a hotel:</label>
            <input type="text" name="hotel" />
            <br />
            <label htmlFor="restaurant">choose a restaurant:</label>
            <input type="text" name="restaurant" />
            <br />
            <input type="submit" />
          </form>
        </div>
        <div>
          <h2>YOUR TRIPS:</h2>
          {"{"}% if trips %{"}"}
          {"{"}% for trip in trips %{"}"}
          <li>
            <h4>
              Hotel: {"{"}
              {"{"}trip[0]{"}"}
              {"}"}, Restaurant: {"{"}
              {"{"}trip[1]{"}"}
              {"}"}
            </h4>
          </li>
          {"{"}% endfor %{"}"}
          {"{"}% else %{"}"}
          <h4>You have no trips!</h4>
          {"{"}% endif %{"}"}
        </div>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/profile">Profile</a>{" "}
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

export default Trip;
