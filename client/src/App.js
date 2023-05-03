import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './app.css'

import Navbar from './Navbar';
import Modal from './Modal';
import Login from './Pages/Login';
import Register from './Pages/Register';
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
        <Route exact path='/' element={<ListMovies url={'/api'}/>} />
        <Route path='/popular' element={<ListMovies url={'/api/popular'} />} /> 
        <Route path='/movie/:id' element={<InfoMovie {...user}/>} />
        <Route path='/contact' element={<Modal msg='Acirca de nos'/>} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/favs' element={<Favorites user={user} favMovies={user.favMovies}/>}/>
        <Route path='*' element={<Modal msg='No hubo coincidencias de ruta'/>} />
      </Routes>
    </Router>
  );
}

export default App;
