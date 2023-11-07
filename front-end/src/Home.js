import React from "react";
import { Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import favicon from './images/favicon.png';
import FlashMsg from './FlashMsg'


import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = ({ currUser, flashMsg }) => {

    return (
        <div className='home-container'>
            <img src={favicon} className='mx-auto my-5' style={{ width: '15rem' }} />
            <Card className='mx-auto col-11'>
                <CardBody className='col-12 mx-auto'>
                    <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                        Welcome to Port Tracker!
                    </CardTitle>
                </CardBody>
            </Card>          
        </div> 
    )
}


export default Home;
