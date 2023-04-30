import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'

import Navbar from './Navbar';
import ListMovies from './MovieList';
import InfoMovie from './InfoMovie';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ListMovies url={'/api'}/>} />
        <Route path='/popular' element={<ListMovies url={'/api/popular'}/>} /> 
        <Route path='/movie/:id' element={<InfoMovie/>}/>
        <Route path='/about' element={<Msg msg='Acirca de nos'/>}>
        <Route path='*' element={<Msg msg='No hubo coincidencias de ruta'/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

const Msg = ({msg}) =>{
  return <h2>{msg}</h2>
}

export default App;
