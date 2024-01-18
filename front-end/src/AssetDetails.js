import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import CryptoAPI from './CryptoAPI'
import CryptoChartWidget from './CryptoChartWidget'
import AssetTags from './AssetTags'
import 'bootstrap/dist/css/bootstrap.min.css';

const AssetDetails = ({ token, setToken }) => {

    const [tokenCategories, setTokenCategories] = useState([])

    const tokenID = useParams()

    useEffect(() => {
        const getToken = async () => {
            const res = await CryptoAPI.getToken('id', tokenID.ID)
            // Categories given with token don't match categories received by query with token ID so two requests must be made
            const cats = await CryptoAPI.getCatID(tokenID.ID)
            
            setToken(res.token.data[`${tokenID.ID}`])
            setTokenCategories(cats.category.data)
            
            return 'Success'
        }
        getToken()
    }, [])

    return (
        <>
        {token !== undefined ? (
            <Card className='mx-auto col-10'>
                <CardBody>
                    <div className='mx-auto col-11'>
                        <CardTitle className='text-start d-flex align-items-center'>
                            <img src={token.logo} 
                                 alt={token.name} 
                                 className='' 
                            />
                            <div className='d-inline display-3 ms-3'>{token.name}</div>
                            <div className='d-inline display-5 ms-3'>({token.symbol})</div>
                        </CardTitle>
                    </div>
            
                    <div className='mt-4'>
                        {/* Unable to incorporate TradingView chart socket without paying so it's just a black rectangle */}
                        <CryptoChartWidget />
                    </div>
            
                    <div>
                        <AssetTags categories={tokenCategories} /> 
                    </div>
                        
            
                    <div className='col-10 mx-auto'>
                        <CardSubtitle className='text-start fs-3'>
                            What is {token.name}?
                        </CardSubtitle>
                        <CardText className='text-start mx-3'>
                            {token.description.slice(0, token.description.indexOf(token.urls.website[0]))} 
                            {<a href={token.urls.website[0]}>{token.urls.website[0]}</a>} 
                            {token.description.slice(token.description.indexOf(token.urls.website[0]) + token.urls.website[0].length)}
                        </CardText>
                    </div>
            
                </CardBody>
            </Card>
        ) : (
            <></>
        )}
        </>
    )
}

export default AssetDetails