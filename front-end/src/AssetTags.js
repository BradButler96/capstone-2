import { React, useState } from "react";
import { Link } from 'react-router-dom';
import { Badge } from "reactstrap";
import { v4 as uuid } from 'uuid';


const AssetTags = ({ categories }) => {

    // ********************************************************************************
    // Use token ID to get categories 
    // Create list using category data with links to tokens in that category
    // ********************************************************************************

    return (
        <ul className='mt-3 mx-auto px-0 col-10' style={{listStyleType: 'none'}}>
        {categories.map(tag => {
            return (
                <li className='d-inline' key={uuid()}>
                    <Badge className='my-1 mx-2 p-2' 
                           color="info" 
                           pill
                    >
                        <Link className='text-decoration-none text-white px-1' to={`/Crypto/Browse?category=${tag.id}`}>
                            {tag.name}
                        </Link>
                    </Badge>
                </li>
            )
        })}
        </ul>
    )
} 

export default AssetTags