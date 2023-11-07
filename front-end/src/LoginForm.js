import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'




const LoginForm = ({ login }) => {
    const initialState = {
        username: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [passwordType, setPasswordType] = useState('password');


    const togglePassword = () => {
        passwordType === 'password' 
        ? setPasswordType('text')
        : setPasswordType('password')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ 
            user: {
                username: formData.username,
                password: formData.password,
            } 
        });
        setFormData(initialState)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className='form-input-container text-start my-4'>
                <label className="col-12 h5" htmlFor='username'>
                    Username
                </label>
                <input 
                    type='text'
                    name='username'
                    className="col-12 input-lg"
                    value={formData.username || ''}
                    onChange={handleChange}
                />
            </div>

            <div className='form-input-container text-start my-4'>
                <label className="col-10 h5" htmlFor='password'>
                    Password
                </label>
                <input 
                    type={passwordType}
                    name='password'
                    className="col-11 input-lg"
                    value={formData.password || ''}
                    onChange={handleChange}
                />
                <Button 
                    className="col-1 px-0" 
                    size='sm' 
                    onClick={() => togglePassword()} 
                >
                    {passwordType === 'password' 
                    ? <FontAwesomeIcon icon={faEye} /> 
                    : <FontAwesomeIcon icon={faEyeSlash} />}
                </Button>
            </div>

            <Button 
                className='login-btn col-6 mx-auto my-2' 
                color="primary" 
                size='lg'
                outline
            >Login</Button>
        </form>
    )

}

export default LoginForm