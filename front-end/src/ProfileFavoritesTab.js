import { React, useState, useEffect, useRef } from "react";
import TokenTable from './TokenTable'
import CryptoAPI from './CryptoAPI'
import SortingClass from './SortingClass'
import LoadingIcon from './LoadingIcon'


const ProfileFavoritesTab = ({ currUser, updateFavorite }) => {
    
    const [favTokens, setFavTokens] = useState()
    const sortBy = useRef('')
    const sortDirection = useRef('')

    const sortTokens = async (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }
        setFavTokens(SortingClass.sortTokens(favTokens, header, sortDirection.current))    
        sortBy.current = header
    }

    useEffect(() => {
        const getFavorites = async () => {
            const res = await CryptoAPI.getFavoriteTokens(currUser.favorites.join(','));
            console.log(res)
            const favoriteTokensArray = Object.keys(res.token.data).map(key => res.token.data[key])
            sortBy.current === '' ? (
                setFavTokens(favoriteTokensArray.sort((a,b) => a.cmc_rank - b.cmc_rank))
            ) : (
                setFavTokens(SortingClass.sortTokens(favoriteTokensArray, sortBy.current, sortDirection.current))
            )

        }
        getFavorites()
    }, [currUser.favorites])


    return (
        favTokens ? (
            <div className='my-5'>
                <TokenTable 
                    currUser={currUser}
                    tokenList={favTokens} 
                    updateFavorite={updateFavorite}
                    sortBy={sortBy.current} 
                    sortDirection={sortDirection.current} 
                    sortTokens={sortTokens}
                    forFavs={true}
                /> 
            </div> 
        ) : (
            <div className='mx-5'>
                <LoadingIcon />
            </div>
        )

    )
}

export default ProfileFavoritesTab