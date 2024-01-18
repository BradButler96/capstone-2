import { React, useState, useEffect } from "react";
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
    // Must keep ranked list to keep duplicate filtering more efficient
    const [rankedTokenList, setRankedTokenList] = useState()
    const [sortDirection, setSortDirection] = useState()
    const [sortBy, setSortBy] = useState()

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

    const loadMoreTokens = async () => {
        const res = await CryptoAPI.getTokenList(tokenList.length);
        const sortedRes = res.tokens.sort((a,b) => a.cmc_rank - b.cmc_rank)
        const filtered = checkOverlap(rankedTokenList, sortedRes)   
        setTokenList(filtered)
        setRankedTokenList(filtered)
    }


    const sortHeader = async (header) => {
        if (header !== sortBy) setSortDirection('ascending')
        else {
            if (sortDirection === 'ascending') setSortDirection('descending') 
            else if (sortDirection === 'descending') setSortDirection('') 
            else setSortDirection('ascending')
        }

        setSortBy(header)
    }

    useEffect(() => {
        const sortAssets = async () => {
            let sorted;
    
            if (tokenList) {
                if (sortDirection === 'ascending') {
                    if (sortBy === 'name') 
                        sorted = [...tokenList].sort((a,b) => a[sortBy].localeCompare(b[sortBy]))
                    else if (sortBy === 'favorites') 
                        sorted = [...tokenList].sort((a,b) => a.cmc_rank - b.cmc_rank)
                    else 
                        sorted = [...tokenList].sort((a,b) => b.quote.USD[sortBy] - a.quote.USD[sortBy])
                } else if (sortDirection === 'descending') {
                    if (sortBy === 'name') 
                        sorted = [...tokenList].sort((a,b) => b[sortBy].localeCompare(a[sortBy]))
                    else if (sortBy === 'favorites') 
                        sorted = [...tokenList].sort((a,b) => b.cmc_rank - a.cmc_rank)
                    else 
                        sorted = [...tokenList].sort((a,b) => a.quote.USD[sortBy] - b.quote.USD[sortBy])
                } else {
                    sorted = [...tokenList].sort((a,b) => a.cmc_rank - b.cmc_rank)
                }
                setTokenList(sorted)
            }
        }
        sortAssets()
    }, [sortBy, sortDirection, rankedTokenList])

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
                setRankedTokenList(res)
            } else {
                const res = await CryptoAPI.getTokensByCat(searchParams.get('category'))
                setTokenList(res.tokens.data.coins)
                setRankedTokenList(res.tokens.data.coins)
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
                    <>    
                    <TokenTable 
                        currUser={currUser}
                        tokenList={tokenList} 
                        updateFavorite={updateFavorite}
                        sortBy={sortBy} 
                        sortDirection={sortDirection} 
                        sortTokens={sortHeader}
                    />     
                    <Button className='col-3 mt-3 mb-4 mx-auto' onClick={() => loadMoreTokens()}>Load More</Button>   
                    </>   
                ) : (
                    <div className='mx-5'>
                        <LoadingIcon />
                    </div>
                )}
            </div>
            
        </div>   
    )

}


export default Browse;
