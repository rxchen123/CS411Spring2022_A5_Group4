import React, { useState } from "react";

function sqlMessage(props) {
    const message = props.message;
    if (message) {
        return <Index/>
    }
}

class Index extends React.Component {
  render() {
    return (
      <div className="index">
            <title>TravelHelper</title>
            {/*if we have a message*/}
        {% if message %}
        <h4>
        {{ message }}
        </h4>
            {"{"}% endif %{"}"}
            {/*if we have a name*/}
        {"{"}% if name %{"}"}
        <h1>
          You are logged in as: {"{"}
          {"{"} name {"}"}
          {"}"}
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
        {"{"}% else %{"}"}
        {"{"}%if logout%{"}"}
        <h1>
          <a href="/">Home</a>
        </h1>
        {"{"}% else %{"}"}
        <h1>
          <a href="/login">Login</a>
        </h1>
        <h1>
          <a href="/register">Register</a>
        </h1>
        {"{"}% endif %{"}"}
        {"{"}% endif %{"}"}
      </div>
    );
  }
}

export default Index;
