
import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Login from './pages/login_folder/login';
import Signup from './pages/signup';
import Currency from'./pages/currency';
  
function App() {

return (

    <Router>
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='/currency' element={<Currency/>} /> 
     </Routes>
     </Router>
);
}
  
export default App;