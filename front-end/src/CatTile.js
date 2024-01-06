import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './CatTile.css';

const CatTile = ({ cat }) => {
    const [netPriceChange, setNetPriceChange] = useState()

    const fontColor = (field) => {
        if (field > 0) return 'text-success'
        else if (field < 0) return 'text-danger'
    }

    useEffect(() => {
        const priceChangeColor = () => {
            if (cat !== undefined) {
                if (cat.volume_change > 0) setNetPriceChange('posChange')
                else if (cat.volume_change < 0) setNetPriceChange('negChange')
                else setNetPriceChange('noChange')
            }
        }
        priceChangeColor()
    }, [netPriceChange])

    return (
        <>
            <td className='text-start col-2'>
                <Link to={`/Crypto/Categories/${cat.id}`}  className='text-decoration-none text-reset'>
                    {cat.title}
                </Link>
            </td>
            <td className='text-center col-1'>
                {cat.num_tokens}
            </td>
            <td className='text-end col-1 pe-5'>
                {cat.market_cap ? `$${cat.market_cap.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : 'N/A'}         
            </td>

            <td className={`text-start col-1 ${fontColor(cat.market_cap_change)}`}>
                {cat.market_cap_change ? `${cat.market_cap_change.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%` : 'N/A'}
            </td>

            <td className='text-end col-1 pe-5'>
                {cat.volume ? `$${cat.volume.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : 'N/A'}
            </td>
            <td className={`text-start col-1 ${fontColor(cat.volume_change)}`}>
                {cat.volume_change ? `${cat.volume_change.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%` : 'N/A'}
            </td>
        </>
    )
}

export default CatTile