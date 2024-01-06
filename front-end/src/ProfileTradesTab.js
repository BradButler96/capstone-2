import { React, useState, useEffect } from "react";
import { Button,
         TabContent, 
         TabPane, 
         Nav, 
         NavItem, 
         NavLink
} from "reactstrap";
import classnames from 'classnames'; 
import ProfileTradesForm from './ProfileTradesForm'
import TradeList from './TradeList'


const ProfileTradesTab = ({ addTrade, tradesList }) => {

    const [currentActiveTab, setCurrentActiveTab] = useState('1'); 
    const toggleTabs = (tab) => {if (currentActiveTab !== tab) setCurrentActiveTab(tab)}; 

    return (
        <>
            <div className='col-12 mt-4 mx-auto' >
                <Nav tabs className='col-6 x-auto'>
                    <NavItem className='col-6'>
                        <NavLink className={`border-bottom ${classnames({ active: currentActiveTab === '1' })}`} 
                                 onClick={() => {toggleTabs('1')}}
                                 style={{  
                                    backgroundColor: currentActiveTab === '1' ? '#14A44D' : '#212122', 
                                    color: '#FBF8E6' 
                                 }}
                        > 
                            Buy 
                        </NavLink> 
                    </NavItem>
                    <NavItem className='col-6'>
                        <NavLink className={`border-bottom ${classnames({ active: currentActiveTab === '2' })}`} 
                                 onClick={() => {toggleTabs('2')}} 
                                 style={{  
                                    backgroundColor: currentActiveTab === '2' ? '#DC4C64' : '#212122', 
                                    color: '#FBF8E6' 
                                 }}
                        >                                     
                            Sell
                        </NavLink> 
                    </NavItem>
                </Nav>
                <TabContent activeTab={currentActiveTab}> 
                    <TabPane tabId="1"> 
                        <ProfileTradesForm orderType={'buy'} addTrade={addTrade} />
                    </TabPane>
                    <TabPane tabId="2"> 
                        <ProfileTradesForm orderType={'sell'} addTrade={addTrade} />
                    </TabPane>
                </TabContent> 
                <div className='mx-auto'>
                    <h2 className='text-start border-bottom my-4'>Trade History</h2>
                    <TradeList tradeList={tradesList} />
                </div>
            </div>
        </> 
    )
}

export default ProfileTradesTab