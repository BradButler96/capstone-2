import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoadingIcon.css';

const LoadingIcon = () => {
    return (
        <div>
            <FontAwesomeIcon className='icon' icon={faCircleNotch} /> 
        </div>
    )
}


export default LoadingIcon;