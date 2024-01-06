import React from "react";
import { Table } from "reactstrap";
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import AssetTile from './AssetTile'
import FilterIcon from './FilterIcon'
import LoadingIcon from './LoadingIcon'

const TokenTable = ({ currUser, tokenList, updateFavorite, sortBy, sortDirection, sortTokens, forFavs }) => {

    return (
        tokenList ? (
            <Table striped hover dark className='browse-table col-12 mx-auto'>
                <thead>
                    <tr>
                        {!forFavs ? (
                            <th className='table-header text-center text-nowrap' onClick={()=> sortTokens('favorites')}>                            
                                <div className='d-inline px-2'>
                                    <FilterIcon 
                                        type='favorites' 
                                        currentFilter={sortBy} 
                                        direction={sortDirection} 
                                    />
                                </div>
                            </th>
                        ) : (
                            <th></th>
                        )}
                        <th></th>
                        <th className='table-header text-start text-nowrap' onClick={()=> sortTokens('name')}>
                            <div className='d-inline'>Name</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon 
                                    type='name' 
                                    currentFilter={sortBy} 
                                    direction={sortDirection} 
                                />
                            </div>
                        </th>
                        <th className='table-header text-start text-nowrap' onClick={()=> sortTokens('price')}>
                            <div className='d-inline'>Price</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon 
                                    type='price' 
                                    currentFilter={sortBy} 
                                    direction={sortDirection} 
                                />
                            </div>
                        </th>
                        <th className='table-header text-start text-nowrap' onClick={()=> sortTokens('percent_change_24h')}>
                            <div className='d-inline'>∆ (24hr)</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon 
                                    type='percent_change_24h' 
                                    currentFilter={sortBy} 
                                    direction={sortDirection}
                                />
                            </div>
                        </th>
                        <th className='table-header text-start text-nowrap' onClick={()=> sortTokens('volume_24h')}>
                            <div className='d-inline'>Volume (24hr)</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon 
                                    type='volume_24h' 
                                    currentFilter={sortBy} 
                                    direction={sortDirection} 
                                />
                            </div>
                        </th>
                        <th className='table-header text-start text-nowrap' onClick={()=> sortTokens('volume_change_24h')}>
                            <div className='d-inline'>∆ (24hr)</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon 
                                    type='volume_change_24h' 
                                    currentFilter={sortBy} 
                                    direction={sortDirection} 
                                />
                            </div>
                        </th>
                        <th className='table-header text-start text-nowrap'>
                            <div className='d-inline'>Market Cap</div>  
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tokenList.map(token => {
                        return (
                            // Filter out inactive tokens or tokens with market cap of $0
                            token.cmc_rank !== null && token.quote.USD.market_cap > 0 ? (
                                <tr key={uuid()}>
                                    <AssetTile asset={token} favorites={currUser.favorites} updateFavorite={updateFavorite} />
                                </tr>
                            ) : (
                                null
                            )
                        )
                    })}
                </tbody>
            </Table>
        ) : (
            <div classname='mx-5'>
                <LoadingIcon />
            </div>
        )

    )
}

export default TokenTable