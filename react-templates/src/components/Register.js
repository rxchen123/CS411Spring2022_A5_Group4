import React from "react";

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
}

export default Register;
