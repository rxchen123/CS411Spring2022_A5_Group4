import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import useToken from "./useToken";
import Logout from "./Logout";

/*
<Header token={removeToken}/>
{!token && token!=="" &&token!== undefined?  
<Login setToken={setToken} />*/


function Navigation(props) {
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
                  <span className="sr-only"></span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/Register">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Login"}>
                    Login
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Profile"}>
                    Profile
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to={"./Trip"}>
                  Trips
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