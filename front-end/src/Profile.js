import React from "react";
import { Navigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { useState } from "react";

// import FlashMsg from './FlashMsg'
import ProfileEditForm from './ProfileEditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import default_pfp from './images/default_pfp.png';


const Profile = ({ editUser, currUser, flashMsg }) => {
    const [formDisplay, setFormDisplay] = useState('none')
    const [infoDisplay, setInfoDisplay] = useState('')

    const toggleForm = () => {
        formDisplay === 'none' 
        ? setFormDisplay('') 
        : setFormDisplay('none')
        
        infoDisplay === 'none' 
        ? setInfoDisplay('') 
        : setInfoDisplay('none')
    }



    return (
        currUser.username !== '' ? (
            <div className='home-container'>
                <div className='user-info-edit-form'
                     style={{'display': formDisplay}}>

                        <ProfileEditForm toggleForm={toggleForm} />
                        {/* THIS IS THE FORM
                    <div className='my-2 row justify-content-center'>
                        <Button className='mx-2 col-3'>Submit</Button>
                        <Button className='mx-2 col-3' 
                                onClick={toggleForm}>Cancel</Button>
                    </div> */}
                </div>
                <div className='user-info-container row mx-auto'
                     style={{'display': infoDisplay}}>
                    <img src={currUser.pfp === '' ? default_pfp : currUser.pfp} 
                         alt={`${currUser.username} profile picture`}
                         className='col-3 mx-auto p-0'
                         style={{ borderRadius: '50%' }}
                    />
                    <Card className='mx-auto col-8 border-secondary'
                          style={{'backgroundColor': '#212122', 'color': '#FBF8E6'}}>
                        <CardBody className='text-start py-0 col-12 d-inline'>
                            <div className='row'>
                                <CardTitle className="text-start col-11" style={{ fontSize: 'xx-large' }}>
                                    {currUser.username}
                                </CardTitle>
                                <div className='text-end p-0 col-1 d-inline'>
                                    <Button className='p-0 col-1'
                                            size='sm'
                                            color='none'                                            
                                            onClick={toggleForm}
                                    >
                                        <FontAwesomeIcon style={{'color': 'gray'}} icon={ faEdit } />
                                    </Button>
                                </div>
                            </div>

                        </CardBody>
                    </Card> 
                </div>
            </div> 
        ) : (
            <Navigate to='/Login' />
        )
    )
    // const toggleForm = () => {
    //     const formContainer = document.getElementById('form-container')
    //     formContainer.style.display === 'none' ? 
    //     formContainer.style.display = '' : 
    //     formContainer.style.display = 'none'

    //     const infoContainer = document.getElementById('info-container')
    //     infoContainer.style.display === 'none' ? 
    //     infoContainer.style.display = '' : 
    //     infoContainer.style.display = 'none'
    // }

    
    
    // return (
    //     <div>
    //         {/* {flashMsg.for === 'edited' ? <FlashMsg msgType={flashMsg.type} msgText={flashMsg.text} /> : null} */}
    //         <Card className='mx-auto col-10'>
    //             <span className='text-end'>
    //                 <Button
    //                     className="edit-profile-btn"
    //                     size='sm'
    //                     color='none'
    //                     onClick={() => toggleForm()}
    //                 >
    //                     <FontAwesomeIcon icon={faEdit} />
    //                 </Button>
    //             </span>

    //             <CardBody className='col-10 mx-auto'>
    //                 <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
    //                     {currUser.username}
    //                 </CardTitle>
    //                 <div id='info-container' className='text-start'>
    //                     <p><b>Username:</b> {currUser.username}</p>
    //                     <p><b>Name:</b> {currUser.firstName} {currUser.lastName}</p>
    //                     <p><b>Email:</b> {currUser.email}</p>   
    //                 </div>
                    
    //                 <div id='form-container' style={{display: 'none'}}>
    //                     <ProfileEditForm currUser={currUser} editUser={editUser} toggleForm={toggleForm} />
    //                 </div>
    //             </CardBody>
    //         </Card>   
    //     </div>
    // )
}

export default Profile