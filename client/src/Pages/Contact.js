import React, {useState} from 'react';

const Contact = () =>{
    const [showModal,setShowModal] = useState(false);
    
    return <div className='contact'>
            <h2>I am Luis Taliercio</h2>
            <h3>I am and advanced student of University Technician in Programming</h3>
            <p>I am passionate by the knowledge and how to use it to create and help in our world</p>
        </div>;
}

export default Contact;