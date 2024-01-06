import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import LoadingIcon from './LoadingIcon'


const DropdownCat = ({ type, options, catID }) => {

    const navigate = useNavigate()
    const [page, setPage] = useState(10)
    const [selectedCat, setSelectedCat] = useState()
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState)
    const loadMore = () => { setPage(page + 10); toggle() }

    const clearCat = () => { setSelectedCat(''); navigate(`/Crypto/Browse`) }

    useEffect(() => {
        if (options && catID) setSelectedCat(options.find(cat => cat.id === catID))
    }, [options, catID])

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down' className='d-flex'>

            <DropdownToggle caret color='info' className='col-3'>
                {!selectedCat ? type : selectedCat.title}
            </DropdownToggle>
            <DropdownMenu dark className='pb-0'>
                {options ? (
                    options.map((item, idx) => {
                        if (idx <= page){
                            return (
                                <DropdownItem key={uuid()} onClick={() => navigate(`/Crypto/Browse?category=${item.id}`)}>
                                        {item.name}
                                </DropdownItem>
                            )
                        }
                    })                   
                ) : (
                    <DropdownItem>
                        <LoadingIcon />
                    </DropdownItem>
                )}
                <DropdownItem className='text-center' onClick={() => loadMore()}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </DropdownItem>  
            </DropdownMenu>
            {selectedCat ? (
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className='my-auto mx-2 p-1' 
                    style={{cursor: 'pointer'}} 
                    onClick={() =>  clearCat()}
                />
            ) : (
                <></>
            )}
            
        </Dropdown>
    )
}

export default DropdownCat