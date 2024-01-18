import { React, useState } from "react";
import { Row, Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Form.css'

const ProfileEditForm = ({ currUser, toggleForm, editUser }) => {

    const initialState = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editUser({ 
            user: {
                password: formData.password,
                firstName: formData.firstName ? formData.firstName : currUser.firstName,
                lastName: formData.lastName ? formData.lastName : currUser.lastName,
                email: formData.email ? formData.email : currUser.email
            } 
        });
        setFormData(initialState)
        toggleForm()
    }

    return (
        <div className='mx-auto col-6'>
            <div className='display-5 text-start border-bottom mt-5'>
                {`Edit ${currUser.username}`}
            </div>
            <Form onSubmit={handleSubmit} className='form my-4'>
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
                                value={formData.email || ''}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    )}
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
                                    value={formData.lastName || ''}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        )}
                    </Form.Group>
                </Row>

                <Form.Group className='form-input-container text-start my-4'>
                    <InputGroup>
                        {formData.password === '' ? (
                            <>
                                <Form.Control 
                                    required
                                    className='form-input'
                                    type={passwordType}
                                    name='password'
                                    placeholder='Password'
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                    style={{height: '2.5rem'}}
                                />
                                <Button variant="link" size='sm' onClick={togglePassword} className='form-btn' style={{height: '2.5rem'}}>
                                {passwordType === 'password' 
                                    ? <FontAwesomeIcon icon={faEye} /> 
                                    : <FontAwesomeIcon icon={faEyeSlash} />}
                                </Button>
                            </>
                        ) : (
                            <>
                                <FloatingLabel controlId='password' label='Password'>
                                    <Form.Control
                                        required
                                        autoFocus
                                        type={passwordType}
                                        name='password'
                                        value={formData.password || ''}
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                                <Button variant="link" size='sm' onClick={togglePassword}>
                                {passwordType === 'password' 
                                    ? <FontAwesomeIcon icon={faEye} /> 
                                    : <FontAwesomeIcon icon={faEyeSlash} />}
                                </Button>
                            </>
                        )}
                    </InputGroup>
                </Form.Group>

                <Row>
                    <Form.Group className='my-3'>
                        <Button 
                            type='submit'
                            variant='outline-success'
                            className='col-4 mx-2' 
                        >Submit</Button>
                        <Button 
                            type='button'
                            variant='outline-danger'
                            className='col-4 mx-2' 
                            onClick={() => toggleForm()}
                        >Cancel</Button>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}

export default ProfileEditForm