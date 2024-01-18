import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Login'
import NewUser from './NewUser'
import Profile from './Profile'
import Browse from './Browse'
import CategoriesBrowse from './CategoriesBrowse'
import CategoriesTokenList from './CategoriesTokenList'
import AssetDetails from './AssetDetails'

const RoutesList = ({ register, login, editUser, currUser, flashMsg, setFlashMsg, token, setToken, categories, setCategories, updateFavorite, addTrade }) => {
    return (
        <Routes>
            <Route exact={true} path="/" element={<Profile 
                                                        editUser={editUser}
                                                        currUser={currUser} 
                                                        flashMsg={flashMsg} 
                                                        setFlashMsg={setFlashMsg} 
                                                        addTrade={addTrade}
                                                        updateFavorite={updateFavorite}
                                                    />} />
                                                  
            <Route exact={true} path="/Signup" element={<NewUser 
                                                            register={register} 
                                                            currUser={currUser} 
                                                            flashMsg={flashMsg} 
                                                            setFlashMsg={setFlashMsg} 
                                                        />} />

            <Route exact={true} path="/Login" element={<Login 
                                                            currUser={currUser} 
                                                            login={login} 
                                                            flashMsg={flashMsg} 
                                                            setFlashMsg={setFlashMsg} 
                                                        />} />

            <Route exact={true} path="/Crypto/Browse" element={<Browse 
                                                                    currUser={currUser} 
                                                                    categories={categories}
                                                                    setCategories={setCategories}
                                                                    updateFavorite={updateFavorite}
                                                                />} />

            <Route exact={true} path="/Crypto/Categories" element={<CategoriesBrowse
                                                                        categories={categories}
                                                                        setCategories={setCategories}
                                                                    />} />

            <Route exact={true} path="/Crypto/Categories/:ID" element={<CategoriesTokenList 
                                                                            currUser={currUser} 
                                                                            updateFavorite={updateFavorite}
                                                                        />} />

            <Route exact={true} path="/Crypto/:ID" element={<AssetDetails
                                                                setToken={setToken}
                                                                token={token}
                                                            />} />

            <Route exact={true} path="*" element={<Navigate to='/' />} />
        </Routes>
      );
}

export default RoutesList