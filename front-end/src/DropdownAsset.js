import { React, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { v4 as uuid } from 'uuid';

const DropdownAsset = ({ assetIDType, setAssetIDType }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState)

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down' className='text-start py-0'>
                <DropdownToggle caret color='dark' className='col-12 text-start ps-0'>                                        
                    <label className="col-12 h5" htmlFor='asset'>
                        {assetIDType}
                    </label>
                </DropdownToggle>
                <DropdownMenu dark>
                    {['Name', 'Symbol', 'Address'].map((item) => {
                        return (
                            <DropdownItem key={uuid()} onClick={() => setAssetIDType(item)}>
                                {item}
                            </DropdownItem>
                        )
                    })}                   
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default DropdownAsset