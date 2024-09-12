import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar'
import RoutesList from './RoutesList'
import PortTrackerAPI from './PortTrackerAPI'
import useLocalStorage from './useLocalStorage'
import CryptoAPI from './CryptoAPI'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const userInitState = {
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: '',
    favorites: '',
    buys: '',
    sells: ''
  }

  const flashInitState = {
    text: '',
    type: '',
    for: '',
    repeat: ''
  }

  const [localUser, setLocalUser] = useLocalStorage('user', userInitState)
  const [currUser, setCurrUser] = useState(localUser)
  const [flashMsg, setFlashMsg] = useState(flashInitState)
  const [token, setToken] = useState()
  const [categories, setCategories] = useState()
  const [favoriteTokens, setFavoriteTokens] = useState()

  const register = async (userInfo) => {
    try{
      await PortTrackerAPI.register(userInfo.user)
      const user = await PortTrackerAPI.getUserInfo(userInfo.user.username)

      setLocalUser(user)

      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'profile',
        repeat: flashMsg.repeat === true ? false : true
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'registration',
        repeat: flashMsg.repeat === true ? false : true
      })
    }
  }

  const editUser = async (userInfo) => {
    try {
      const user = await PortTrackerAPI.editProfile(currUser.username, userInfo.user)

      const newUserInfo = {   
        token: user.token,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        pfp: user.pfp,
        favorites: currUser.favorites,
        buys: currUser.buys,
        sells: currUser.sells
      }

      setLocalUser(newUserInfo)

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'login',
        repeat: flashMsg.repeat === true ? false : true
      })
    }
  }

  const login = async (userInfo) => {
    try {
      await PortTrackerAPI.login(userInfo.user)
      const user = await PortTrackerAPI.getUserInfo(userInfo.user.username)

      setLocalUser(user)
      ﻿
      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'profile',
        repeat: flashMsg.repeat === true ? false : true
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'login',
        repeat: flashMsg.repeat === true ? false : true
      })
    }
  }

  const logout = async () => {
    await PortTrackerAPI.logout()
    setLocalUser(userInitState)

    setFlashMsg({
      text: 'See you later!',
      type: 'info',
      for: 'login',
      repeat: flashMsg.repeat === true ? false : true
    })
  }

  const updateFavorite = async (action, id) => {
    const updatedFavs = await PortTrackerAPI.updateFavorites(currUser.username, action, id)
    setLocalUser({
      ...localUser,
      favorites: updatedFavs
    })
  }

  // const getFavoriteTokens = async () => {
  //   const res = await CryptoAPI.getFavoriteTokens(currUser.favorites.join(','));
  //   return res.token.data
  // }

  const addTrade = async (data) => {
    const check = await CryptoAPI.getToken(data.assetIDType.toLowerCase(), data.asset.toLowerCase())

    if (check.token.status.error_code === 0) {

      // API returns object with symbol as key when using symbol as query string
      // API returns object with token ID as key for other query strings
      const tokenID = data.assetIDType !== 'Symbol' 
      ? Object.values(check.token.data)[0].id 
      : Object.values(check.token.data)[0][0].id

      const tokenName = data.assetIDType !== 'Symbol' 
      ? Object.values(check.token.data)[0].name 
      : Object.values(check.token.data)[0][0].name

      const updateOrders = await PortTrackerAPI.addTxn({
        assetID: tokenID,
        asset: tokenName,
        quantity: data.quantity,
        price: data.price,
        orderType: data.orderType,
        username: currUser.username
      })

      data.orderType === 'buy' ? (
        setLocalUser({
          ...localUser,
          buys: updateOrders
        })
      ) : (
        setLocalUser({
          ...localUser,
          sells: updateOrders
        })
      )
      setFlashMsg({
        text: `Transaction has been added`,
        type: 'success',
        for: 'profile',
        repeat: flashMsg.repeat === true ? false : true
      })
    } else {
      setFlashMsg({
        text: `Token could not be found. Make sure you submitted the selected asset ID type.`,
        type: 'danger',
        for: 'profile',
        repeat: flashMsg.repeat === true ? false : true
      })
    }
  }

  // Update user in local storage
  useEffect(() => {
    setCurrUser(localUser)
    PortTrackerAPI.token = localUser.token
  }, [localUser])

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar 
          currUser={currUser} 
          logout={logout}
        />
        <RoutesList 
          register={register}
          login={login}
          editUser={editUser}
          currUser={currUser}         
          flashMsg={flashMsg}
          setFlashMsg={setFlashMsg}
          token={token}
          setToken={setToken}
          categories={categories}
          setCategories={setCategories}
          updateFavorite={updateFavorite}
          favoriteTokens={favoriteTokens}
          addTrade={addTrade}
        /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
