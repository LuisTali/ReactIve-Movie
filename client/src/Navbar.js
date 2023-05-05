import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({completeName,email,setUser}) =>{
    const navigate = useNavigate();

    const handleLogout = () =>{ //Setea el usuario a null y borra el localStorage, quitando el usuario logeado
        setUser({});
        localStorage.clear();
        navigate('/');    
    }

    return <nav>
        <a href='https://www.linkedin.com/in/luis-taliercio-43a335182/' target="_blank"><img src={'/ltLogo.png'} /></a>
        <h1 style={{color:'black', textShadow:'rgb(220, 220, 220) -4px -4px'}}>React(ive) Movie</h1>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/popular'>Popular</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            {completeName && <li><Link to='/favs'>My List</Link></li>}
            <li>{completeName ? <a onClick={handleLogout}>Log Out</a> : <Link to='/login'>Log In</Link>}</li>
        </ul>
    </nav>
}

export default Navbar;