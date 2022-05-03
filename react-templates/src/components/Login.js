import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div>
        <title>TravelHelper</title>
        {"{"}% if message %{"}"}
        <h4>
            {/*{{message}}*/}
            {/*<Attribute message = '{{message}}'/>*/}
        </h4>
        {"{"}% endif %{"}"}
        <div className="title">
          <h1> Login </h1>
        </div>
        <div id="content">
          <form action="login" method="POST">
            <label htmlFor="email">enter email:</label>
            <input type="text" name="email" id="email" placeholder="email" />
            <br />
            <label htmlFor="password">enter password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
            <br />
            <input type="submit" name="submit" />
          </form>
        </div>
        <br />
        <h1>
          <a href="/">Home</a>
        </h1>
      </div>
    );
  }
}

export default Login;
