import React from "react";
import { NavLink } from "react-router-dom";
import {Link} from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
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
                <NavLink className="nav-link" to="/signin">
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/Signup">
                  Sign Up
                </NavLink>
              </li>
              <Link to={"./Dashboard"}>
                Dashboard
                    </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;