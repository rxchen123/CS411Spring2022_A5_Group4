import React, {useState,useEffect} from "react";
import axios from 'axios';
import useToken from "./useToken";
import { NavLink } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Logout from  "./Logout";
import Profile from "./Profile";
import Register from "./Register";
import Unauth from "./Unauth";
import Navigation from "./Navigation";

function Trip(props){
    const [addTrip, addTripForm] = useState({
        hotel: "",
        restaurant: ""
    })

    const [trips, getTripArray] = useState([])

    function addTripFunc(event) {
        if (props.token != null){
        axios({
            method: "POST",
            url: "http://localhost:5000/trip",
            headers: {
                Authorization: 'Bearer ' + props.token
            },
            data: {
                hotel: addTrip.hotel,
                restaurant: addTrip.restaurant
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
        }
        /*
        setregisterForm(({
            email: "",
            password: ""
        }))
        */
        event.preventDefault()
    }

    function handleChange(event) {
        const { value, name } = event.target
        addTripForm(prevNote => ({
            ...prevNote, [name]: value
        })
        )
    }

    /*render the trips*/
    function getTrips(){
        if (props.token != null){
            axios({
                method: "GET",
                url: "http://localhost:5000/trip",
                headers: {
                    Authorization: 'Bearer ' + props.token
                },
            })
            /*
            .then((response) => this.trips = response.map((p, index) => (
                <React.Fragment>
                <b> {p} </b> {response.length - 1 !== index && "and"}
                 </React.Fragment>
                )))   
            */   
            .then((response) => getTripArray(response.data.trips)) 
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
        }
    }

    function ConvertToList(){
        return(
            trips.map((p, index) => (
            <React.Fragment>
            <b> {p} </b> {trips.length - 1 !== index}
            </React.Fragment>
            ))
        )
    }
    
    
    useEffect(() => {
        getTrips();
    },[]);
    /*

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
        
    }
    
    // [] at the end prevents it from running constantly
    //alternative to componentDidMount() which doesn't work with functional components
    // https://stackoverflow.com/questions/63193114/how-do-i-call-a-function-automatically-when-page-loads-up-in-react-js-in-2020 
    useEffect(() => {
        if (props.token != null){
            getData();
        }
    }, []);
    */

    return (
      <div>
        <title>TravelHelper</title>
        <h1>Create a Trip!</h1>
        <div id="trip">
          <input onChange={handleChange}
                    type="hotel"
                    text={addTrip.hotel}
                    name="hotel"
                    placeholder="Hotel"
                    value={addTrip.hotel} />
                <input onChange={handleChange}
                    type="restaurant"
                    text={addTrip.restaurant}
                    name="restaurant"
                    placeholder="Restaurant"
                    value={addTrip.restaurant} />
          <button onClick={() => { addTripFunc(); getTrips();}}>Submit</button>
        </div>
        <div>
          <h2>YOUR TRIPS:</h2>
          <ConvertToList/>
        </div>
        </div>
        
        
    );
}

export default Trip;

/*YOUR TRIPS

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
          {"{"}% endif %{"}"}*/


/*
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
        */