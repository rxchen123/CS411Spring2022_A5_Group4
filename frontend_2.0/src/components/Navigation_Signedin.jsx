import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Signin from './Signin';

function Navigation() {
  const [token, setToken] = useState();
  if(!token) {
    return <Signin setToken={setToken} />
  }
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/" >
            TravelHelper :)
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/Signout">
                  Sign Out
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Currency"}>
                  Currency
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