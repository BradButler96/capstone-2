import { React, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, 
         CardTitle, 
         CardSubtitle, 
         CardBody, 
         Button,
         TabContent, 
         TabPane, 
         Nav, 
         NavItem, 
         NavLink
       } from "reactstrap";
import FlashMsg from './FlashMsg'
import ProfileEditForm from './ProfileEditForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import default_pfp from './images/default_pfp.png';
import classnames from 'classnames'; 
import ProfileFavoritesTab from './ProfileFavoritesTab'
import ProfileTradesTab from './ProfileTradesTab'

const Profile = ({ editUser, currUser, flashMsg, setFlashMsg, addTrade, updateFavorite }) => {
    const [formDisplay, setFormDisplay] = useState('none');
    const [infoDisplay, setInfoDisplay] = useState('');
    const [currentActiveTab, setCurrentActiveTab] = useState('1'); 
    const [userTradeTotal, setUserTradeTotal] = useState();
    const [tradesList, setTradesList] = useState()

    const toggleForm = () => {
        formDisplay === 'none' 
        ? setFormDisplay('') 
        : setFormDisplay('none')
        
        infoDisplay === 'none' 
        ? setInfoDisplay('') 
        : setInfoDisplay('none')
    }

    const toggleTabs = (tab) => {if (currentActiveTab !== tab) setCurrentActiveTab(tab)}; 

    const calculateTradeTotal = () => {
        if (currUser.username !== '') {
            const totalSpent = currUser.buys.map(buy => buy.quantity * buy.price).reduce((total, spent) => total + spent, 0);
            const totalEarned = currUser.sells.map(sell => sell.quantity * sell.price).reduce((total, spent) => total + spent, 0);
            
            setUserTradeTotal(totalEarned - totalSpent)
        }
    }

    const getTradeHistory = () => {
        const txns = [...currUser.buys, ...currUser.sells]
        const sortedTxns = txns.sort((a,b) => b.date_added.localeCompare(a.date_added))
        setTradesList(sortedTxns)
    }

    useEffect(() => {
        calculateTradeTotal();
        getTradeHistory()
    }, [currUser.buys, currUser.sells])

    return (
        currUser.username !== '' ? (
            <div className='home-container mx-auto '>
                {flashMsg.for === 'profile' ? (
                    <div className='mx-auto col-10'>
                        <FlashMsg flashMsg={flashMsg} setFlashMsg={setFlashMsg} />
                    </div>
                ) : <></>}
                <div className='user-info-edit-form'
                     style={{display: formDisplay}}>
                        <ProfileEditForm currUser={currUser} toggleForm={toggleForm} editUser={editUser} />
                </div>
                <div className='user-info-container row mx-auto mt-5 col-10' style={{display: infoDisplay}}>
                    <img src={currUser.pfp === '' ? default_pfp : currUser.pfp} 
                         alt={`${currUser.username} profile picture`}
                         className='col-2 my-3 mx-2 p-0'
                         style={{ borderRadius: '50%', height: '15rem', width: 'auto' }}
                    />
                    <Card className='mt-2 mx-auto col-9' style={{backgroundColor: '#212122', color: '#FBF8E6'}}>
                        <CardBody className='text-start py-0 px-0 col-12 d-inline'>
                            <div className='row pb-3'>
                                <CardTitle className="text-start col-11" style={{ fontSize: 'xx-large' }}>
                                    {currUser.username}
                                </CardTitle>
                                <div className='text-end p-0 col-1 d-inline'>
                                    <Button className='p-0 col-1'
                                            size='sm'
                                            color='none'                                            
                                            onClick={toggleForm}
                                    >
                                        <FontAwesomeIcon style={{color: 'gray'}} icon={ faEdit } />
                                    </Button>
                                </div>
                                <CardSubtitle className='h4 ms-3 my-1'>
                                    {currUser.firstName} {currUser.lastName} 
                                </CardSubtitle>
                                <CardSubtitle className='h4 ms-3 my-1'>
                                    {currUser.email}
                                </CardSubtitle>

                                {userTradeTotal ? (
                                    <div>
                                        <CardSubtitle className='d-inline h4 ms-3 my-1'>
                                            Total P&L: 
                                        </CardSubtitle>
                                        <CardSubtitle className={userTradeTotal.toFixed(2) > 0 ? `d-inline h4 my-1 ms-2 text-success` : `d-inline h4 my-1 ms-2 text-danger`}>
                                            {`$${userTradeTotal.toFixed(2)}`} 
                                        </CardSubtitle>
                                    </div>
                                ) : (
                                    <CardSubtitle className='h4 ms-3 my-1'>
                                        Total P&L: $0.00
                                    </CardSubtitle>
                                )}
                            </div>
                        </CardBody>
                    </Card> 

                    <div className='tabs-container my-4 mx-auto col-12'>
                        <Nav tabs>
                            <NavItem className='col-6'>
                                <NavLink className={classnames({ active: currentActiveTab === '1' })} 
                                         onClick={() => {toggleTabs('1')}}
                                         style={{  color: currentActiveTab === '1' ? '#212122' : '#FBF8E6' }}> 
                                    Trades 
                                </NavLink> 
                            </NavItem>
                            <NavItem className='col-6'>
                                <NavLink className={classnames({ active: currentActiveTab === '2' })} 
                                         onClick={() => {toggleTabs('2')}} 
                                         style={{  color: currentActiveTab === '2' ? '#212122' : '#FBF8E6' }}>
                                    Favorites 
                                </NavLink> 
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={currentActiveTab}> 
                            <TabPane tabId="1"> 
                                <ProfileTradesTab addTrade={addTrade} tradesList={tradesList} />
                            </TabPane>
                            <TabPane tabId="2"> 
                                <ProfileFavoritesTab currUser={currUser} updateFavorite={updateFavorite} />
                            </TabPane>
                        </TabContent> 
                    </div>
                </div>
            </div> 
        ) : (
            <Navigate to='/Login' />
        )
    )
}

export default Profile