import React from "react";
import { Navigate, Link } from "react-router-dom";
import NewUserForm from './NewUserForm'
import FlashMsg from './FlashMsg'

const NewUser = ({ register, currUser, flashMsg }) => {

    return (
        currUser.username !== '' ? <Navigate to='/' /> : (
            <div>
                {flashMsg.for === 'registration' ? (
                    <div className='mt-5 mx-auto col-10'>
                        <FlashMsg flashMsg={flashMsg} />
                    </div>
                ) : <></>}
                
                <NewUserForm register={register} />   
                <Link to='/Login'><small>Already have an account? Login here!</small></Link>
            </div>
        )
    )
}

export default NewUser