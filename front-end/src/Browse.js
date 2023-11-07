import React from "react";
import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Switch, Stack, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';

import 'bootstrap/dist/css/bootstrap.min.css';
import AssetTile from './AssetTile'
import FlashMsg from './FlashMsg'
import CryptoAPI from './CryptoAPI'


const Browse = ({ currUser, flashMsg }) => {
    
    const [browseCrypto, setBrowseType] = useState(true)
    const [tokenList, setTokenList] = useState([])


    const getTokens = async () => {
        const res = await CryptoAPI.getTokenList();        
        return res.tokens
    }

    useEffect(() => {
        const getAssets = async () => {
            // const res = browseCrypto ? (
            //     await getTokens()
            // ) : (
            //     'Stock'
            // )
            // console.log(res)
            // setTokenList(res)
            // return tokenList


            setTokenList([
                {
                    "id":1,
                    "name":"Bitcoin",
                    "symbol":"BTC",
                    "slug":"bitcoin",
                    "num_market_pairs":10518,
                    "date_added":"2010-07-13T00:00:00.000Z",
                    "tags":[
                        {"slug":"mineable","name":"Mineable","category":"OTHERS"},
                        {"slug":"pow","name":"PoW","category":"ALGORITHM"},
                        {"slug":"sha-256","name":"SHA-256","category":"ALGORITHM"},
                        {"slug":"store-of-value","name":"Store Of Value","category":"CATEGORY"},
                        {"slug":"state-channel","name":"State Channel","category":"CATEGORY"},
                        {"slug":"coinbase-ventures-portfolio","name":"Coinbase Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"three-arrows-capital-portfolio","name":"Three Arrows Capital Portfolio","category":"CATEGORY"},
                        {"slug":"polychain-capital-portfolio","name":"Polychain Capital Portfolio","category":"CATEGORY"},
                        {"slug":"binance-labs-portfolio","name":"Binance Labs Portfolio","category":"CATEGORY"},
                        {"slug":"blockchain-capital-portfolio","name":"Blockchain Capital Portfolio","category":"CATEGORY"},
                        {"slug":"boostvc-portfolio","name":"BoostVC Portfolio","category":"CATEGORY"},
                        {"slug":"cms-holdings-portfolio","name":"CMS Holdings Portfolio","category":"CATEGORY"},
                        {"slug":"dcg-portfolio","name":"DCG Portfolio","category":"CATEGORY"},
                        {"slug":"dragonfly-capital-portfolio","name":"DragonFly Capital Portfolio","category":"CATEGORY"},
                        {"slug":"electric-capital-portfolio","name":"Electric Capital Portfolio","category":"CATEGORY"},
                        {"slug":"fabric-ventures-portfolio","name":"Fabric Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"framework-ventures-portfolio","name":"Framework Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"galaxy-digital-portfolio","name":"Galaxy Digital Portfolio","category":"CATEGORY"},
                        {"slug":"huobi-capital-portfolio","name":"Huobi Capital Portfolio","category":"CATEGORY"},
                        {"slug":"alameda-research-portfolio","name":"Alameda Research Portfolio","category":"CATEGORY"},
                        {"slug":"a16z-portfolio","name":"a16z Portfolio","category":"CATEGORY"},
                        {"slug":"1confirmation-portfolio","name":"1Confirmation Portfolio","category":"CATEGORY"},
                        {"slug":"winklevoss-capital-portfolio","name":"Winklevoss Capital Portfolio","category":"CATEGORY"},
                        {"slug":"usv-portfolio","name":"USV Portfolio","category":"CATEGORY"},
                        {"slug":"placeholder-ventures-portfolio","name":"Placeholder Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"pantera-capital-portfolio","name":"Pantera Capital Portfolio","category":"CATEGORY"},
                        {"slug":"multicoin-capital-portfolio","name":"Multicoin Capital Portfolio","category":"CATEGORY"},
                        {"slug":"paradigm-portfolio","name":"Paradigm Portfolio","category":"CATEGORY"},
                        {"slug":"bitcoin-ecosystem","name":"Bitcoin Ecosystem","category":"PLATFORM"},
                        {"slug":"ftx-bankruptcy-estate","name":"FTX Bankruptcy Estate ","category":"CATEGORY"}
                    ],
                    "max_supply":21000000,
                    "circulating_supply":19531518,
                    "total_supply":19531518,
                    "is_active":1,
                    "infinite_supply":false,
                    "platform":null,
                    "cmc_rank":1,
                    "is_fiat":0,
                    "self_reported_circulating_supply":null,
                    "self_reported_market_cap":null,
                    "tvl_ratio":null,
                    "last_updated":"2023-11-03T00:28:00.000Z",
                    "quote":{
                        "USD":{
                            "price":34801.0450615457,
                            "volume_24h":20715503848.6481,
                            "volume_change_24h":-8.2474,
                            "percent_change_1h":-0.16182741,
                            "percent_change_24h":-2.19074481,
                            "percent_change_7d":2.04739676,
                            "percent_change_30d":27.04990204,
                            "percent_change_60d":34.21081451,
                            "percent_change_90d":19.71640794,
                            "market_cap":679717238038.391,
                            "market_cap_dominance":52.7538,
                            "fully_diluted_market_cap":730821946292.46,
                            "tvl":null,
                            "last_updated":"2023-11-03T00:28:00.000Z"
                        }
                    }
                },{
                    "id":1027,
                    "name":"Ethereum",
                    "symbol":"ETH",
                    "slug":"ethereum",
                    "num_market_pairs":7688,
                    "date_added":"2015-08-07T00:00:00.000Z",
                    "tags":[
                        {"slug":"pos","name":"PoS","category":"ALGORITHM"},
                        {"slug":"smart-contracts","name":"Smart Contracts","category":"CATEGORY"},
                        {"slug":"ethereum-ecosystem","name":"Ethereum Ecosystem","category":"PLATFORM"},
                        {"slug":"coinbase-ventures-portfolio","name":"Coinbase Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"three-arrows-capital-portfolio","name":"Three Arrows Capital Portfolio","category":"CATEGORY"},
                        {"slug":"polychain-capital-portfolio","name":"Polychain Capital Portfolio","category":"CATEGORY"},
                        {"slug":"binance-labs-portfolio","name":"Binance Labs Portfolio","category":"CATEGORY"},
                        {"slug":"blockchain-capital-portfolio","name":"Blockchain Capital Portfolio","category":"CATEGORY"},
                        {"slug":"boostvc-portfolio","name":"BoostVC Portfolio","category":"CATEGORY"},
                        {"slug":"cms-holdings-portfolio","name":"CMS Holdings Portfolio","category":"CATEGORY"},
                        {"slug":"dcg-portfolio","name":"DCG Portfolio","category":"CATEGORY"},
                        {"slug":"dragonfly-capital-portfolio","name":"DragonFly Capital Portfolio","category":"CATEGORY"},
                        {"slug":"electric-capital-portfolio","name":"Electric Capital Portfolio","category":"CATEGORY"},
                        {"slug":"fabric-ventures-portfolio","name":"Fabric Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"framework-ventures-portfolio","name":"Framework Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"hashkey-capital-portfolio","name":"Hashkey Capital Portfolio","category":"CATEGORY"},
                        {"slug":"kenetic-capital-portfolio","name":"Kenetic Capital Portfolio","category":"CATEGORY"},
                        {"slug":"huobi-capital-portfolio","name":"Huobi Capital Portfolio","category":"CATEGORY"},
                        {"slug":"alameda-research-portfolio","name":"Alameda Research Portfolio","category":"CATEGORY"},
                        {"slug":"a16z-portfolio","name":"a16z Portfolio","category":"CATEGORY"},
                        {"slug":"1confirmation-portfolio","name":"1Confirmation Portfolio","category":"CATEGORY"},
                        {"slug":"winklevoss-capital-portfolio","name":"Winklevoss Capital Portfolio","category":"CATEGORY"},
                        {"slug":"usv-portfolio","name":"USV Portfolio","category":"CATEGORY"},
                        {"slug":"placeholder-ventures-portfolio","name":"Placeholder Ventures Portfolio","category":"CATEGORY"},
                        {"slug":"pantera-capital-portfolio","name":"Pantera Capital Portfolio","category":"CATEGORY"},
                        {"slug":"multicoin-capital-portfolio","name":"Multicoin Capital Portfolio","category":"CATEGORY"},
                        {"slug":"paradigm-portfolio","name":"Paradigm Portfolio","category":"CATEGORY"},
                        {"slug":"injective-ecosystem","name":"Injective Ecosystem","category":"PLATFORM"},
                        {"slug":"layer-1","name":"Layer 1","category":"CATEGORY"},
                        {"slug":"ftx-bankruptcy-estate","name":"FTX Bankruptcy Estate ","category":"CATEGORY"}
                    ],
                    "max_supply":null,
                    "circulating_supply":120268792.38734597,
                    "total_supply":120268792.38734597,
                    "is_active":1,"infinite_supply":true,
                    "platform":null,
                    "cmc_rank":2,
                    "is_fiat":0,
                    "self_reported_circulating_supply":null,
                    "self_reported_market_cap":null,
                    "tvl_ratio":null,
                    "last_updated":"2023-11-03T00:29:00.000Z",
                    "quote":{
                        "USD":{
                            "price":1793.5856067959915,
                            "volume_24h":8918289595.708378,
                            "volume_change_24h":-15.7961,
                            "percent_change_1h":-0.31559359,
                            "percent_change_24h":-3.15621962,
                            "percent_change_7d":-0.3672651,
                            "percent_change_30d":8.69678671,
                            "percent_change_60d":9.65008083,
                            "percent_change_90d":-1.91733694,
                            "market_cap":215712374972.67905,
                            "market_cap_dominance":16.7399,
                            "fully_diluted_market_cap":215712374972.68,
                            "tvl":null,
                            "last_updated":"2023-11-03T00:29:00.000Z"
                        }
                    }
                }
            ])



        }
        getAssets()
    }, [browseCrypto])



    return (
    <div className='home-container'>
        <Card className='mx-auto col-11'>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Stocks</Typography>
                <Switch  
                    checked={browseCrypto}
                    color="default"
                    onChange={() => {browseCrypto ? setBrowseType(false) : setBrowseType(true)}} 
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>Crypto</Typography>
            </Stack>


            <CardBody className='col-12 mx-auto'>
                {browseCrypto ? (
                    <>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Cryptocurrency
                        </CardTitle>
                        <ol >
                            {tokenList.map(token => {
                                return (
                                    <li key={uuid()}>
                                        <AssetTile type='crypto' asset={token} />
                                    </li>
                                )
                            })}
                        </ol>
                    </>
                ) : (
                    <>
                        <CardTitle className="text-center" style={{ fontSize: 'xx-large' }}>
                            Stocks
                        </CardTitle>

                        <AssetTile type='stock' />
                    </>
                )}
            </CardBody>
        </Card>   
    </div>
    )

}


export default Browse;
