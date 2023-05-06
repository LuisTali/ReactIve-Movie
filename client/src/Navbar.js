import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';


const Navbar = ({completeName,email,setUser}) =>{
    const navigate = useNavigate();
    const [showModal,setShowModal] = useState(false);

    const handleLogout = () =>{ //Setea el usuario a null y borra el localStorage, quitando el usuario logeado
        setUser({});
        localStorage.clear();
        navigate('/');    
        setShowModal(true);
    }

    return <nav>
        <a href='https://www.linkedin.com/in/luis-taliercio-43a335182/' target="_blank"><img src={'/ltLogo.png'} /></a>
        <h1 style={{color:'black', textShadow:'rgb(220, 220, 220) -4px -4px'}}>React(ive) Movie</h1>
        {showModal && <Modal msg='Log Out Succesfull' setShowModal={setShowModal}/>}
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