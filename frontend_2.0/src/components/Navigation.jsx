import React from "react";
import { NavLink } from "react-router-dom";
import {Link} from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/" font-family = 'Didot'>
            TripHelper :)
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Signin">
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/Signup">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Currency"}>
                  Currency
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Dashboard"}>
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;