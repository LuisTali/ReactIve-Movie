import React, { useEffect, useState } from "react";

const Modal = ({msg}) =>{
    const [isShow,setIsShow] = useState(true);

    return <h3 className={`modal ${!isShow && 'isInactive'}`}>{msg}</h3>
}

export default Modal;