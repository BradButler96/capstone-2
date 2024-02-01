import React, { useState } from "react";
// import { Button } from "reactstrap";
import { Row, Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './Form.css'


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
        <div className='mx-auto'>
            <div className='display-5 text-start border-bottom mt-2'>Login Here</div>
            <Form onSubmit={handleSubmit} className='form my-4'>
            <Form.Group className='my-2'>
                {formData.username === '' ? (
                    <Form.Control 
                        type='username'
                        name='username'
                        placeholder='Username'
                        value={formData.username || ''}
                        onChange={handleChange}
                    />
                ) : (
                    <FloatingLabel controlId='username' label='Username'>
                        <Form.Control 
                            autoFocus
                            type='username'
                            name='username'
                            value={formData.username || ''}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                )}
            </Form.Group>

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
                            <Button variant="link" onClick={togglePassword} className='py-0' style={{height: '2.5rem'}}>
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
                <Form.Group className='mt-3'>
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

export default LoginForm