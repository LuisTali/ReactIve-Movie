import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'

import Navbar from './Navbar';
import Footer from './Footer'
import Modal from './Modal';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contact from './Pages/Contact';
import ListMovies from './moviesComponents/MovieList';
import InfoMovie from './moviesComponents/InfoMovie';
import Favorites from './Pages/Favorites'


function App() {
  const [user,setUser] = useState({});
  const [favsList,setFavsList] = useState([]);

  useEffect(()=>{
    const loggedinUser = localStorage.getItem('user');
    if(loggedinUser){
      setUser(JSON.parse(loggedinUser));
    }
  },[])

  return (
    <Router>
      <Navbar {...user} setUser={setUser}/>
      <Routes>
        <Route exact path='/' element={<ListMovies url={'/api'} title='Now Playing'/>} />
        <Route path='/popular' element={<ListMovies url={'/api/popular'} title='Popular Movies'/>} /> 
        <Route path='/movie/:id' element={<InfoMovie user={user} setUser={setUser}/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/favs' element={<Favorites user={user} favMovies={user.favMovies}/>}/>
        <Route path='*' element={<Modal msg='No hubo coincidencias de ruta'/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
