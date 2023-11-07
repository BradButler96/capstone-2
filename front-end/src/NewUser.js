import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import NewUserForm from './NewUserForm'
import FlashMsg from './FlashMsg'

import { useState, useEffect } from "react";


const NewUser = ({ register, currUser, flashMsg }) => {

    return (
        // currUser.username !== '' ? <Navigate to='/' /> : (
            <div>
                {/* {flashMsg.for === 'registration' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null} */}

                <Card className='mx-auto my-5 col-10'>
                    <CardBody className='col-8 mx-auto'>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Register Here!
                        </CardTitle>
                        <NewUserForm register={register} />   
                        <Link to='/Login'><small>Already have an account? Login here!</small></Link>
          
                    </CardBody>
                </Card>  
            </div>
        // )
    )
}

export default NewUser