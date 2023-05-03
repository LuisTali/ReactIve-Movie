import React,{useRef,useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import Modal from "./Modal";

const Login = ({setUser}) =>{
    const baseUrl = 'http://localhost:5000/auth';
    const navigate = useNavigate();
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const [showModal,setShowModal] = useState(false);
    const [modalContent,setModalContent] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        if(email && password){
            try {
                const response = await axios.post(baseUrl + '/login',{email:email,password:password});
                if(!response.data.success){
                    setModalContent(response.data.msg);
                    setShowModal(true);
                }else{
                    setUser(response.data.loggedUser);
                    setModalContent(`Welcome back ${response.data.loggedUser.completeName}`);
                    setShowModal(true);
                    let userString = JSON.stringify(response.data.loggedUser);
                    localStorage.setItem('user',userString);
                    let user = JSON.parse(localStorage.getItem('user'));
                    console.log(user);
                    navigate('/');
                }
            } catch (error) {
                throw error   
            }  
        }else{
            setModalContent('Please fill all the fields');
            setShowModal(true);
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
            <div className="inputGroup">
                <label>Email</label>
                <input type="text" ref={refEmail}/>
            </div>
            <div className="inputGroup">
                <label>Password</label>
                <input type="password" ref={refPassword}/>
            </div>
            <button type="subtmit">submit</button>
            <label>Don't you have an Account?</label><Link to='/register'>Register</Link>
        </form>
    </>
}

export default Login;