import { React, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import CryptoAPI from './CryptoAPI'
import TokenTable from './TokenTable'
import SortingClass from './SortingClass'

const CategoriesTokenList = ({ currUser, updateFavorite }) => {

    const [tokens, setTokens] = useState()
    const [tokenHeader, setTokenHeader] = useState()
    const desired = useParams()
    const sortBy = useRef('')
    const sortDirection = useRef('')

    const sortTokens = (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }

        setTokens(SortingClass.sortTokens(tokens, header, sortDirection.current))
        sortBy.current = header
    }

    useEffect(() => {
        const getCatID = async () => {
            const res = await CryptoAPI.getTokensByCat(desired.ID)
            setTokens(res.tokens.data.coins)
            setTokenHeader(res.tokens.data.description)
        }
        getCatID()
    }, [])

    return (
        tokens ? (
            <div className='mx-auto col-lg-10 col-sm-12'>
                <div className='text-start border-bottom display-4 mt-4'>
                    {`${tokenHeader} Tokens`}
                </div>
                <div className='my-4'>
                    <TokenTable 
                        currUser={currUser}
                        tokenList={tokens} 
                        updateFavorite={updateFavorite}
                        sortBy={sortBy.current} 
                        sortDirection={sortDirection.current} 
                        sortTokens={sortTokens}
                    />  
                </div>

            </div>
        ) : (
            <div>Loading...</div>
        )
    )
}

export default CategoriesTokenList