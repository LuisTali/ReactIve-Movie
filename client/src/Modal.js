import React, { useEffect, useState} from "react";

const Modal = ({msg,setShowModal,type}) =>{
    useEffect(()=>{
        if(type){
            if(type == 'static') return;
        }else{
            setTimeout(()=>{
                if(setShowModal) setShowModal(false);
            },3000)
        }
       
    })
    return <h3 className={`modal`}>{msg}</h3>
}

export default Modal;