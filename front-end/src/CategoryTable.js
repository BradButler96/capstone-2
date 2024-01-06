import { React } from "react";
import { Table } from "reactstrap";
import CatTile from './CatTile'
import { v4 as uuid } from 'uuid';
import FilterIcon from './FilterIcon'
import LoadingIcon from './LoadingIcon'

const CategoryTable = ({ categories, sortBy, sortDirection, sortCats }) => {

    return (
        categories ? (
            <Table striped hover dark className='col-12 mx-auto'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='table-header text-start col-2' onClick={()=> sortCats('name')}>
                            <div className='d-inline'>Name</div>  
                            <div className='d-inline px-2'>
                                <FilterIcon type='name' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                        </th>
                        <th className='table-header text-center col-1' onClick={()=> sortCats('num_tokens')} >
                            <div className='d-inline ps-4'>Tokens</div> 
                            <div className='d-inline px-2'>
                                <FilterIcon type='num_tokens' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                        </th>
                        <th className='table-header text-end col-1 pe-5' onClick={()=> sortCats('market_cap')}>
                            <div className='d-inline px-2'>
                                <FilterIcon type='market_cap' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                            <div className='d-inline'>Market Cap (USD)</div>  

                        </th>
                        <th className='table-header text-start col-1' onClick={()=> sortCats('market_cap_change')}>
                            <div className='d-inline'>∆ (24hr)</div> 
                            <div className='d-inline px-2'>
                                <FilterIcon type='market_cap_change' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                        </th>
                        <th className='table-header text-end col-1 pe-5' onClick={()=> sortCats('volume')}>
                            <div className='d-inline px-2'>
                                <FilterIcon type='volume' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                            <div className='d-inline'>Volume (USD)</div> 

                        </th>
                        <th className='table-header text-start col-1' onClick={()=> sortCats('volume_change')}>
                            <div className='d-inline'>∆ (24hr)</div> 
                            <div className='d-inline px-2'>
                                <FilterIcon type='volume_change' currentFilter={sortBy} direction={sortDirection} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(cat => {
                        return (
                            <tr key={uuid()}>
                                <td className='text-end col-1 pe-5'>{categories.indexOf(cat) + 1}.</td>
                                <CatTile cat={cat} />
                            </tr>
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

export default CategoryTable