import React, {useState, useEffect} from "react";
import axios from "axios";
import useToken from "./useToken";
import LogoutButton from "./Logout";
import removeToken from ".././App";

function Profile(props) {

    const [profileData, setProfileData] = useState(null)
    function getData() {
    if (props.token != null){
    axios({
      method: "GET",
      url:"http://localhost:5000/profile",
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      console.log(props.token)
      const res =response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        email: res.email}))
      console.log(res)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    }

    function CheckToken(){
        console.log(props.token)
    }

    /*this is a functional component so this doesn't work here
    componentDidMount() { 
        
    }*/
    
    // [] at the end prevents it from running constantly
    //alternative to componentDidMount() which doesn't work with functional components
    // https://stackoverflow.com/questions/63193114/how-do-i-call-a-function-automatically-when-page-loads-up-in-react-js-in-2020 
    useEffect(() => {
        if (props.token != null){
            getData();
        }
    }, []);

    return (
      <div>
        <div className="Profile">
        {profileData && <div>
              <p>Email: {profileData.email}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
        {/*
        <LogoutButton token={removeToken}/>
        <button onClick={CheckToken}>CheckToken</button>
        */}
        </div>
    </div>
        
    );
}

/*
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
</div>*/


export default Profile;
