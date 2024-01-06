import { React, useState, useEffect, useRef } from "react";
import TokenTable from './TokenTable'
import CryptoAPI from './CryptoAPI'
import SortingClass from './SortingClass'


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
            // const res = await CryptoAPI.getFavoriteTokens(currUser.favorites.join(','));
            // const favoriteTokensArray = Object.keys(res.token.data).map(key => res.token.data[key])
            // sortBy.current === '' ? (
            //     setFavTokens(favoriteTokensArray.sort((a,b) => a.cmc_rank - b.cmc_rank))
            // ) : (
            //     setFavTokens(SortingClass.sortTokens(favoriteTokensArray, sortBy.current, sortDirection.current))
            // )
            
            setFavTokens([{
                circulating_supply: 19570100,
                cmc_rank: 1,
                date_added: "2010-07-13T00:00:00.000Z",
                id: 1,
                infinite_supply: false,
                is_active: 1,
                is_fiat: 0,
                last_updated: "2023-12-14T23:49:00.000Z",
                max_supply: 21000000,
                name: "Bitcoin",
                num_market_pairs: 10647,
                platform: null,
                quote: {
                    USD: {
                        fully_diluted_market_cap: 902690588657.52,
                        last_updated: "2023-12-14T23:49:00.000Z",
                        market_cap: 841225956623.1671,
                        market_cap_dominance: 51.7551,
                        percent_change_1h: -0.18112523,
                        percent_change_7d: -0.82957262,
                        percent_change_24h: 0.12033471,
                        percent_change_30d: 20.8478993,
                        percent_change_60d: 58.35522988,
                        percent_change_90d: 61.36733483,
                        price: 42985.266126548515,
                        tvl: null,
                        volume_24h: 25599427468.582905,
                        volume_change_24h: -4.4922
                    }
                },
                self_reported_circulating_supply: null,
                self_reported_market_cap: null,
                slug: "bitcoin",
                symbol: "BTC",
                tags: [],
                total_supply: 19570100,
                tvl_ratio: null
            },{
                circulating_supply: 911294948,
                cmc_rank: 40,
                date_added: "2022-05-31T16:19:46.000Z",
                id: 11840,
                infinite_supply: false,
                is_active: 1,
                is_fiat: 0,
                last_updated: "2023-12-14T23:52:00.000Z",
                max_supply: 4294967296,
                name: "Optimism",
                num_market_pairs: 396,
                platform: {id: 11840, name: 'Optimism', symbol: 'OP', slug: 'optimism-ethereum', token_address: '0x4200000000000000000000000000000000000042'},
                quote: {
                    USD: {
                        fully_diluted_market_cap: 9703038729.34,
                        last_updated: "2023-12-14T23:52:00.000Z",
                        market_cap: 2058765425.8806093,
                        market_cap_dominance: 0.1267,
                        percent_change_1h: 0.46038618,
                        percent_change_7d: 3.49857377,
                        percent_change_24h: 0.86976985,
                        percent_change_30d: 25.61274663,
                        percent_change_60d: 86.84603605,
                        percent_change_90d: 60.72132023,
                        price: 2.259164752749852,
                        tvl: null,
                        volume_24h: 294166838.0233344,
                        volume_change_24h: -18.9486
                    }
                },
                self_reported_circulating_supply: null,
                self_reported_market_cap: null,
                slug: "optimism-ethereum",
                symbol: "OP",
                tags: [],
                total_supply: 4294967296,
                tvl_ratio: null
            }])
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
            <div>
                Loading...
            </div>
        )

    )
}

export default ProfileFavoritesTab