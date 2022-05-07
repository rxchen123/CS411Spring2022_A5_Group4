import React from 'react';
import axios from "axios";
import useToken from "./useToken";
import { NavLink } from 'react-router-dom';

function LogoutButton(props) {
    function logMeOut() {
        axios({
            method: "POST",
            url:"http://localhost:5000/logout",
        })
        .then((response) => {
            props.token()
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}
    return(
        <NavLink className="nav-link" to="/" onClick={logMeOut}>
            Log Out
        </NavLink>
    )
}

export default LogoutButton;
