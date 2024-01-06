import { React, useState } from "react";
import { Row, Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import UploadWidget from './UploadWidget';
import './Form.css'

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
    }

    return (
            <div className='mx-auto col-6'>
                <div className='display-5 text-start border-bottom mt-5'>Register Here</div>
                <Form onSubmit={handleSubmit} className='form my-4'>
                    <Form.Group>
                        {formData.username === '' ? (
                            <Form.Control 
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={formData.username || ''}
                                onChange={handleChange}
                            />
                        ) : (
                            <FloatingLabel controlId='username' label='Username'>
                                <Form.Control 
                                    autoFocus
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                    value={formData.username || ''}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        )}
                    </Form.Group>
                    <Form.Group className='form-input-container text-start my-4'>
                        <InputGroup>
                            {formData.password === '' ? (
                                <Form.Control 
                                    required
                                    className='form-label'
                                    type={passwordType}
                                    name='password'
                                    placeholder='Password'
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                <FloatingLabel controlId='password' label='Password'>
                                    <Form.Control
                                        required
                                        autoFocus
                                        type={passwordType}
                                        name='password'
                                        placeholder='Password'
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            )}
    
                            <Button variant="link" onClick={togglePassword}>
                                {passwordType === 'password' 
                                    ? <FontAwesomeIcon icon={faEye} /> 
                                    : <FontAwesomeIcon icon={faEyeSlash} />}
                            </Button>
                        </InputGroup>
                    </Form.Group>
    
                    <Row className='my-4'>
                        <Form.Group className='col-6'>
                            {formData.firstName === '' ? (
                                <Form.Control 
                                    type='text'
                                    name='firstName'
                                    placeholder='First Name'
                                    value={formData.firstName || ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                <FloatingLabel controlId='firstName' label='First Name'>
                                    <Form.Control 
                                        autoFocus
                                        type='text'
                                        name='firstName'
                                        placeholder='firstName'
                                        value={formData.firstName || ''}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            )}
                        </Form.Group>
                        <Form.Group className='col-6'>
                            {formData.lastName === '' ? (
                                <Form.Control 
                                    type='text'
                                    name='lastName'
                                    placeholder='Last Name'
                                    value={formData.lastName || ''}
                                    onChange={handleChange}
                                />
                            ) : (
                                <FloatingLabel controlId='lastName' label='Last Name'>
                                    <Form.Control 
                                        autoFocus
                                        type='text'
                                        name='lastName'
                                        placeholder='Last Name'
                                        value={formData.lastName || ''}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                            )}
                        </Form.Group>
                    </Row>
    
                    <Form.Group className='my-2'>
                        {formData.email === '' ? (
                            <Form.Control 
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        ) : (
                            <FloatingLabel controlId='email' label='Email'>
                                <Form.Control 
                                    autoFocus
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        )}
                    </Form.Group>

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
    
                    <Row>
                        <Form.Group className='my-3'>
                            <Button 
                                type='submit'
                                variant='outline-success'
                                className='col-4 mx-2' 
                            >Submit</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
    
        )
}

export default NewUserForm