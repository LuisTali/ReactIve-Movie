import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () =>{
    return <nav>
        <a href='https://github.com/LuisTali' target="_blank"><img src={'/ltLogo.png'} /></a>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/popular'>Popular</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Log In</Link></li>
        </ul>
    </nav>
}

export default Navbar;