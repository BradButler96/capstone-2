import React from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import NewUserForm from './NewUserForm'
import FlashMsg from './FlashMsg'

const NewUser = ({ register, currUser, flashMsg, setFlashMsg }) => {

    return (
        currUser.username !== '' ? <Navigate to='/' /> : (
            <>
                {flashMsg.for === 'registration' ? (
                    <div className='mt-5 mx-auto col-10'>
                        <FlashMsg flashMsg={flashMsg} setFlashMsg={setFlashMsg} />
                    </div>
                ) : <></>}
                
                <div className='d-flex align-items-center justify-content-center'  style={{height:'85vh'}}>
                    <Card className='col-8'>
                        <CardBody className='col-8 mx-auto'>
                            <NewUserForm register={register} />   
                            <Link to='/Login'><small>Already have an account? Login here!</small></Link>
                        </CardBody>
                    </Card>  
                </div>
            </>
        )
    )
}

export default NewUser