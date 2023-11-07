import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import UploadWidget from './UploadWidget'

const NewUserForm = ({ register }) => {
    const initialState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        pfp: ''
    }

    const [formData, setFormData] = useState(initialState);
    const [passwordType, setPasswordType] = useState('password');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

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
        register({ 
            user: {
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                pfp: formData.pfp
            } 
        });
        setFormData(initialState)
        setSubmitted(true)
    }

    useEffect(() => {
        if (submitted) {
            navigate('/')
            setSubmitted(false)
        }
    }, [submitted])

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
                <small className='col-12 text-center'>20 characters max</small>
            </div>

            <div className='form-label-container text-start mt-4 row'>
                <div className='form-label-input-container text-start col-6'>
                    <div className='form-input-container col-11 d-flex'>
                        <label className="h5 me-auto" htmlFor='firstName'>
                            First Name
                        </label>
                    </div>
                    <div className='form-input-container col-12 d-flex'>
                        <input 
                            type='text'
                            name='firstName'
                            className="col-11 input-lg me-auto"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='form-label-input-container text-start col-6 ms-auto'>
                    <div className='form-input-container col-11 d-flex ms-auto'>
                        <label className="col-12 h5" htmlFor='lastName'>
                            Last Name
                        </label>
                    </div>
                    <div className='form-input-container col-12 d-flex ms-auto'>
                        <input 
                            type='text'
                            name='lastName'
                            className="col-11 input-lg ms-auto"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className='form-input-container text-start my-4'>
                <label className="col-12 h5" htmlFor='email'>
                    Email
                </label>
                <input 
                    type='email'
                    name='email'
                    className="col-12 input-lg me-auto"
                    value={formData.email || ''}
                    onChange={handleChange}
                />
            </div>

            <div className='form-input-container text-start my-4'>
                <label className="col-12 h5" htmlFor='email'>
                    Profile Picture
                </label>
                <UploadWidget />
                {/* <input 
                    type='file'
                    name='pfp'
                    className="col-12 input-lg me-auto"
                    value={formData.pfp || ''}
                    onChange={handleChange}
                    accept='image/*'
                /> */}
            </div>

            <Button 
                className='login-btn col-6 mx-auto my-2' 
                color="success" 
                size='lg'
                outline
            >Submit</Button>
        </form>
    )

}

export default NewUserForm