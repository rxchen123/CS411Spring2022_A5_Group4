
import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Login from './pages/login_folder/login';
import Signup from './pages/signup';
  
function App() {

return (

    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} /> 
     </Routes>
     </Router>
);
}
  
export default App;
