import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar'
import RoutesList from './RoutesList'
import PortTrackerAPI from './PortTrackerAPI'
import useLocalStorage from './useLocalStorage'


import './App.css';

function App() {

  const userInitState = {
    token: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: '',
  }

  const flashInitState = {
    text: '',
    type: '',
    for: ''
  }

  const [localUser, setLocalUser] = useLocalStorage('user', userInitState)
  const [currUser, setCurrUser] = useState(localUser)
  const [flashMsg, setFlashMsg] = useState(flashInitState)

  const register = async (userInfo) => {
    try{
      console.log(userInfo.user)
      await PortTrackerAPI.register(userInfo.user)
      const user = await PortTrackerAPI.getUserInfo(userInfo.user.username)
      setLocalUser(user)

      console.log(user)

      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'home'
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'registration'
      })
    }
  }

  const login = async (userInfo) => {
    try {
      await PortTrackerAPI.login(userInfo.user)
      const user = await PortTrackerAPI.getUserInfo(userInfo.user.username)

      setLocalUser(user)

      setFlashMsg({
        text: `Welcome ${userInfo.user.username}`,
        type: 'success',
        for: 'home'
      })

    } catch (err) {
      setFlashMsg({
        text: err[0],
        type: 'danger',
        for: 'login'
      })
    }
  }

  const logout = async () => {
    await PortTrackerAPI.logout()
    setLocalUser(userInitState)

    setFlashMsg({
      text: 'See you later!',
      type: 'info',
      for: 'logout'
    })
  }

  useEffect(() => {
    const setState = () => {
      setCurrUser(localUser)
      PortTrackerAPI.token = localUser.token
    }
    setState()
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
          currUser={currUser}         
          flashMsg={flashMsg}
        /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
