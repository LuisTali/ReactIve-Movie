import React,{useEffect, useRef,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Modal from '../Modal.js';

const Register = () =>{
    const baseUrl = 'http://localhost:5000/auth';
    const navigate = useNavigate();
    const refName = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const name = refName.current.value;
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        if(name && email && password){
            axios.post(`${baseUrl}/register`,{completeName:name,email:email,password:password})
            refName.current.value = "";
            refEmail.current.value = "";
            refPassword.current.value = "";
            setModalContent("Usuario registrado");
            setShowModal(true);
            navigate('/login');
        }else{
            setModalContent("Llene todos los campos")
            setShowModal(true)
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setShowModal(false);
        },3000)
    },[showModal])

    return <>
        {showModal && <Modal msg={modalContent}/>}
        
        <form onSubmit={handleSubmit}>
            <h2>Create an Account</h2>
            <div className="inputGroup">
                <label>Complete Name</label>
                <input type="text" ref={refName}/>
            </div>
            <div className="inputGroup">
                <label>Email</label>
                <input type="text" ref={refEmail}/>
            </div>
            <div className="inputGroup">
                <label>Password</label>
                <input type="password" ref={refPassword}/>
            </div>
            <button type="subtmit">submit</button>
        </form>
    </>
}

export default Register;