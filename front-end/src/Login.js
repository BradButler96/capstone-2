import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import FlashMsg from './FlashMsg'
import LoginForm from './LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = ({ login, currUser, flashMsg }) => {
    return (
        currUser.username !== '' ? <Navigate to='/' /> : (
            <>
                {flashMsg.for === 'login' ? (
                    <div className='d-block mt-5 mx-auto col-10'>
                        <FlashMsg flashMsg={flashMsg} />
                    </div>
                ) : <></>}
                <div className='d-flex align-items-center justify-content-center' style={{height:'85vh'}}>
                    
                    <Card className='col-6 d-flex align-items-center justify-content-center'>
                        <CardBody className='col-8 mx-auto'>
                            <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                                Login Below:
                            </CardTitle>
                            <LoginForm login={login} />    
                            <Link to='/SignUp'><small>Need an account? Register here!</small></Link>
                        </CardBody>
                    </Card>  
                </div> 
            </>
        )
    )
}


export default Login;