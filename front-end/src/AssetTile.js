import React from "react";
import { useState } from "react";
import { Card, CardBody, CardTitle, } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const AssetTile = ({ type, asset, key }) => {

    return (
        type === 'crypto' ? (
            <>
                <Card className='mx-auto col-10'>
                    <CardBody id={key}>
                        <CardTitle className="d-flex align-items-center ">
                            {/* {JSON.stringify(asset)} */}
                            {/* {<img 
                                src={asset.logo} 
                                alt={asset.name} 
                                style={{width: '1rem'}}
                                className='mx-2'  
                            />}  */}

                            <table>
                                <tr>
                                    <td>{asset.name} ({asset.symbol})</td>
                                    <td>${asset.quote.USD.price.toFixed(2)}</td>
                                    <td>${asset.quote.USD.market_cap.toFixed(2)}</td>
                                </tr>
                            </table>

                        </CardTitle>
                    </CardBody>
                </Card>
            </>
        ) : (
            <>
                <Card className='mx-auto col-10'>
                    <CardBody id={key}>
                        <CardTitle>
                            "Stonks"
                        </CardTitle>
                    </CardBody>
                </Card>
            </>
        )

    )

}

export default AssetTile