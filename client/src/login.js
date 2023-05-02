import React,{useRef,useState} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () =>{
    const baseUrl = 'http://localhost:5000/auth';
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const [showModal,setShowModal] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const email = refEmail.current.value;
        const password = refPassword.current.value;
        if(email && password){
            axios.post(baseUrl + '/login',{email:email,password:password});
        }
    }

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