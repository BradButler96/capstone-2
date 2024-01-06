import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import './FilterIcon.css'


const FilterIcon = ({ type, currentFilter, direction }) => {

    if (currentFilter !== type || direction === '') 
        return <FontAwesomeIcon icon={faSort} className='sort-arrow' />
    else if (currentFilter === type && direction === 'ascending') 
        return <FontAwesomeIcon icon={faSortUp} className='sort-arrow-up' />
    else if (currentFilter === type && direction === 'descending') 
        return <FontAwesomeIcon icon={faSortDown} className='sort-arrow-down' />

}

export default FilterIcon