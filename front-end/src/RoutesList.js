import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home'
import Login from './Login'
import NewUser from './NewUser'
import Profile from './Profile'
import Browse from './Browse'

const RoutesList = ({ register, login, currUser, flashMsg }) => {
    return (
            <Routes>
                <Route exact={true} path="/" element={<Home 
                                                        currUser={currUser} 
                                                        flashMsg={flashMsg} 
                                                      />} />

                <Route exact={true} path="/Signup" element={<NewUser 
                                                                register={register} 
                                                                currUser={currUser} 
                                                                flashMsg={flashMsg} 
                                                            />} />
    
                <Route exact={true} path="/Login" element={<Login 
                                                                currUser={currUser} 
                                                                login={login} 
                                                                flashMsg={flashMsg} 
                                                            />} />

                <Route exact={true} path="/:username" element={<Profile 
                                                                // editUser={editUser}
                                                                currUser={currUser} 
                                                                flashMsg={flashMsg} 
                                                            />} />

                <Route exact={true} path="/Browse" element={<Browse 
                    // editUser={editUser}
                    currUser={currUser} 
                    flashMsg={flashMsg} 
                />} />

                <Route exact={true} path="*" element={<Navigate to='/' />} />
            </Routes>
      );
}

export default RoutesList