import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetTile.css';


const AssetTile = ({ asset, favorites, updateFavorite }) => {
    
    const fontColor = (field) => {
        if (field > 0) return 'text-success'
        else if (field < 0) return 'text-danger'
    }
    
    return (
            asset ? (
                <>
                    <td>
                        {favorites.indexOf(asset.id) > -1 ? (
                            <FontAwesomeIcon icon={faStarSolid} onClick={() => updateFavorite('-', asset.id)} />
                        ) : (
                            <FontAwesomeIcon icon={faStarRegular} onClick={() => updateFavorite('+', asset.id)} />
                        ) }
                    </td>

                    <td className='text-center ps-1 pe-2'>
                        {asset.cmc_rank}.
                    </td>
                    <td className='text-start pe-0'>
                        <Link to={`/Crypto/${asset.id}`} className='text-decoration-none text-reset'>
                            {asset.name} ({asset.symbol})
                        </Link>
                    </td>
                    <td className='text-start'>
                        ${asset.quote.USD.price > 0.01 ? (
                            asset.quote.USD.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        ) : (
                            asset.quote.USD.price.toFixed(10)
                        )}
                    </td>
                    <td className={`text-start ${fontColor(asset.quote.USD.percent_change_24h)}`}>
                        {asset.quote.USD.percent_change_24h.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%
                    </td>
                    <td className='text-start'>
                        ${asset.quote.USD.volume_24h.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td className={`text-start ${fontColor(asset.quote.USD.volume_change_24h)}`}>
                        {asset.quote.USD.volume_change_24h.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%
                    </td>
                    <td className='text-start'>
                        ${asset.quote.USD.market_cap.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </>
            ) : (
                <div></div>
            )
            

    )

}

export default AssetTile