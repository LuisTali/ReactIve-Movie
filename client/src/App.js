import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'

import Navbar from './Navbar';
import Modal from './Modal';
import Login from './login';
import Register from './register';
import ListMovies from './moviesComponents/MovieList';
import InfoMovie from './moviesComponents/InfoMovie';


function App() {
  const [user,setUser] = useState({});
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ListMovies url={'/api'}/>} />
        <Route path='/popular' element={<ListMovies url={'/api/popular'}/>} /> 
        <Route path='/movie/:id' element={<InfoMovie/>}/>
        <Route path='/contact' element={<Modal msg='Acirca de nos'/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<Modal msg='No hubo coincidencias de ruta'/>}/>
      </Routes>
    </Router>
  );
}

export default App;
