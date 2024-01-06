import { React, useState, useEffect, useRef } from "react";
import { useSearchParams } from 'react-router-dom';
import { Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoAPI from './CryptoAPI'
import SortingClass from './SortingClass'
import DropdownCat from './DropdownCat'
import TokenTable from './TokenTable'
import LoadingIcon from './LoadingIcon'

const Browse = ({ currUser, categories, setCategories, updateFavorite }) => {
    
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    const [tokenList, setTokenList] = useState()
    const sortBy = useRef('')
    const sortDirection = useRef('')

    const checkOverlap = (arr1, arr2) => {
        const lastArr1 = arr1[arr1.length - 1]
        const firstArr2 = arr2[0]

        if (lastArr1.cmc_rank >= firstArr2.cmc_rank) return checkOverlap(arr1.slice(0, -1), arr2)
        else return [...arr1, ...arr2]
    } 

    const filterDuplicates = (data, key) => data.map(x => (key(x), x))

    const getCrypto = async () => {
        const res = await CryptoAPI.getTokenList(); 
        const sorted = res.tokens.sort((a,b) => a.cmc_rank - b.cmc_rank)
        // API returns duplicates of tokens in array
        const filtered = filterDuplicates(sorted, obj => obj.rank)
        return filtered
    }

    // **************************************** Revisit this ****************************************
    // Rewrite to get new tokenList from start to finish
    const loadMoreTokens = async () => {
        const res = await CryptoAPI.getTokenList(tokenList.length);
        const sortedRes = res.tokens.sort((a,b) => a.cmc_rank - b.cmc_rank)
        const filtered = checkOverlap(tokenList, sortedRes)   
        const sorted = SortingClass.sortTokens(filtered, sortBy.current, sortBy.current, sortDirection.current)
        setTokenList(sorted)        
    }

    // **************************************** Revisit this ****************************************
    const sortTokens = async (header) => {
        if (header !== sortBy.current) sortDirection.current = 'ascending'
        else {
            if (sortDirection.current === 'ascending') sortDirection.current = 'descending'
            else if (sortDirection.current === 'descending') sortDirection.current = ''
            else sortDirection.current = 'ascending'
        }

        if (header === 'favorites' && sortDirection.current === '') {
            const res = await getCrypto()
            setTokenList(res)
        } else if (header === 'favorites' && sortDirection.current !== '') {
            // Rewrite so it gets all favorited tokens, places them in front of tokenList
            // Order tokenList by favorites then mcap
            const res = await CryptoAPI.getFavoriteTokens(currUser.favorites.join(','))
            const favoriteTokens = Object.keys(res.token.data).map(key => res.token.data[key])
            const tokens = SortingClass.sortTokens(favoriteTokens, header, sortDirection.current)
            setTokenList(tokens)
        } else {
            setTokenList(SortingClass.sortTokens(tokenList, header, sortDirection.current))
        }

        sortBy.current = header
    }

    useEffect(() => {
        const getAssets = async () => {
            if (categories === undefined) {
                const cats = await CryptoAPI.getCats()
                const filtered = cats.categories.data.filter(cat => cat.num_tokens > 0 && cat.market_cap > 0)
                setCategories(SortingClass.sortCats(filtered, 'name', 'ascending'))
            }

            if (searchParams.get('category') === null) {    
                const res = await getCrypto()
                setTokenList(res)
            } else {
                const res = await CryptoAPI.getTokensByCat(searchParams.get('category'))
                setTokenList(res.tokens.data.coins)
            }            
        }
        getAssets()
    }, [category])

    return (
        <div className='mx-auto col-lg-10 col-xs-12 col-sm-12'>
            <div className='text-start border-bottom display-4 mt-4'>
                Tokens
            </div>
            <span className='text-start mx-5'>
                <DropdownCat type='Categories' options={categories} catID={category} />
            </span>
            <div className='my-2'>
                {tokenList ? (               
                    <TokenTable 
                        currUser={currUser}
                        tokenList={tokenList} 
                        updateFavorite={updateFavorite}
                        sortBy={sortBy.current} 
                        sortDirection={sortDirection.current} 
                        sortTokens={sortTokens}
                        forFavs={false}
                    />        
                ) : (
                    <div classname='mx-5'>
                        <LoadingIcon />
                    </div>
                )}
            </div>
            <Button className='col-3 mt-3 mb-4 mx-auto' onClick={() => loadMoreTokens()}>Load More</Button>
        </div>   
    )

}


export default Browse;
