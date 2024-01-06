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
            // const res = await CryptoAPI.getToken('id', tokenID.ID)
            // // Categories given with token don't match categories received by query with token ID so two requests must be made
            // const cats = await CryptoAPI.getCatID(tokenID.ID)
            
            // setToken(res.token.data[`${tokenID.ID}`])
            // setTokenCategories(cats.category.data)

            setToken({
                "id":1,
                "name":"Bitcoin",
                "symbol":"BTC",
                "category":"coin",
                "description":"Bitcoin (BTC) is a cryptocurrency launched in 2010. Users are able to generate BTC through the process of mining. Bitcoin has a current supply of 19,542,468. The last known price of Bitcoin is 35,572.90449862 USD and is down -2.29 over the last 24 hours. It is currently trading on 10552 active market(s) with $23,208,141,342.95 traded over the last 24 hours. More information can be found at https://bitcoin.org/.",
                "slug":"bitcoin",
                "logo":"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
                "subreddit":"bitcoin",
                "notice":"",
                "tags":["mineable","pow","sha-256","store-of-value","state-channel","coinbase-ventures-portfolio","three-arrows-capital-portfolio","polychain-capital-portfolio","binance-labs-portfolio","blockchain-capital-portfolio","boostvc-portfolio","cms-holdings-portfolio","dcg-portfolio","dragonfly-capital-portfolio","electric-capital-portfolio","fabric-ventures-portfolio","framework-ventures-portfolio","galaxy-digital-portfolio","huobi-capital-portfolio","alameda-research-portfolio","a16z-portfolio","1confirmation-portfolio","winklevoss-capital-portfolio","usv-portfolio","placeholder-ventures-portfolio","pantera-capital-portfolio","multicoin-capital-portfolio","paradigm-portfolio","bitcoin-ecosystem","ftx-bankruptcy-estate"],
                "tag-names":["Mineable","PoW","SHA-256","Store Of Value","State Channel","Coinbase Ventures Portfolio","Three Arrows Capital Portfolio","Polychain Capital Portfolio","Binance Labs Portfolio","Blockchain Capital Portfolio","BoostVC Portfolio","CMS Holdings Portfolio","DCG Portfolio","DragonFly Capital Portfolio","Electric Capital Portfolio","Fabric Ventures Portfolio","Framework Ventures Portfolio","Galaxy Digital Portfolio","Huobi Capital Portfolio","Alameda Research Portfolio","a16z Portfolio","1Confirmation Portfolio","Winklevoss Capital Portfolio","USV Portfolio","Placeholder Ventures Portfolio","Pantera Capital Portfolio","Multicoin Capital Portfolio","Paradigm Portfolio","Bitcoin Ecosystem","FTX Bankruptcy Estate "],
                "tag-groups":["OTHERS","ALGORITHM","ALGORITHM","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","CATEGORY","PLATFORM","CATEGORY"],
                "urls":{
                    "website":["https://bitcoin.org/"],
                    "twitter":[],
                    "message_board":["https://bitcointalk.org"],
                    "chat":[],
                    "facebook":[],
                    "explorer":["https://blockchain.info/","https://live.blockcypher.com/btc/","https://blockchair.com/bitcoin","https://explorer.viabtc.com/btc","https://www.oklink.com/btc"],
                    "reddit":["https://reddit.com/r/bitcoin"],
                    "technical_doc":["https://bitcoin.org/bitcoin.pdf"],
                    "source_code":["https://github.com/bitcoin/bitcoin"],
                    "announcement":[]
                },
                "platform":null,
                "date_added":"2010-07-13T00:00:00.000Z",
                "twitter_username":"",
                "is_hidden":0,
                "date_launched":"2010-07-13T00:00:00.000Z",
                "contract_address":[],
                "self_reported_circulating_supply":null,
                "self_reported_tags":null,
                "self_reported_market_cap":null,
                "infinite_supply":false
            })

            setTokenCategories([
                {
                    "id":"6437284985f6a3507d5fd57d",
                    "name":"FTX Bankruptcy Estate ",
                    "title":"FTX Bankruptcy Estate ",
                    "description":"FTX Bankruptcy Estate ",
                    "num_tokens":27,
                    "avg_price_change":0.7755778988000002,
                    "market_cap":1026335284117.7001,
                    "market_cap_change":1.267624,
                    "volume":43999593746.00982,
                    "volume_change":-11.289323999999999,
                    "last_updated":"2023-09-09T20:39:55.222Z"
                },{
                    "id":"63feda8ad0a19758f3bde124",
                    "name":"Bitcoin Ecosystem",
                    "title":"Bitcoin Ecosystem",
                    "description":"Bitcoin Ecosystem",
                    "num_tokens":62,
                    "avg_price_change":0.6097061114285715,
                    "market_cap":712199860744.7499,
                    "market_cap_change":-0.1894836734693876,
                    "volume":24693419296.72072,
                    "volume_change":3.0986918367346954,
                    "last_updated":"2023-08-09T13:53:10.756Z"
                },{
                    "id":"605e2ec9d41eae1066535f82",
                    "name":"Paradigm Portfolio",
                    "title":"Paradigm Portfolio",
                    "description":"Paradigm Portfolio",
                    "num_tokens":16,
                    "avg_price_change":2.447255687333333,
                    "market_cap":706494394514.76,
                    "market_cap_change":3.2043066666666666,
                    "volume":24781475032.862534,
                    "volume_change":2.8168133333333345,
                    "last_updated":"2021-11-10T10:30:15.958Z"
                },{
                    "id":"605e2e73d41eae1066535f80",
                    "name":"Multicoin Capital Portfolio",
                    "title":"Multicoin Capital Portfolio",
                    "description":"Multicoin Capital Portfolio",
                    "num_tokens":28,"avg_price_change":1.1504358964,
                    "market_cap":1001711831827.07,
                    "market_cap_change":1.0201479999999998,
                    "volume":41029438776.485985,
                    "volume_change":-6.612247999999998,
                    "last_updated":"2021-03-26T23:29:46.673Z"
                },{
                    "id":"605e2e38d41eae1066535f7f",
                    "name":"Pantera Capital Portfolio",
                    "title":"Pantera Capital Portfolio",
                    "description":"Pantera Capital Portfolio",
                    "num_tokens":55,
                    "avg_price_change":0.5702551825531914,
                    "market_cap":989238165456.4901,
                    "market_cap_change":13.712408510638301,
                    "volume":40622505302.724014,
                    "volume_change":6.4384127659574455,
                    "last_updated":"2021-03-26T23:24:51.227Z"
                },{
                    "id":"605e2e0bd41eae1066535f7e",
                    "name":"Placeholder Ventures Portfolio",
                    "title":"Placeholder Ventures Portfolio",
                    "description":"Placeholder Ventures Portfolio",
                    "num_tokens":17,
                    "avg_price_change":-0.9590470713333333,
                    "market_cap":942109283904.1399,
                    "market_cap_change":-1.1346533333333335,
                    "volume":36648210392.89197,
                    "volume_change":-17.485293333333335,
                    "last_updated":"2021-03-26T23:24:50.090Z"
                },{
                    "id":"605e2d726507f27280c38982",
                    "name":"USV Portfolio",
                    "title":"USV Portfolio",
                    "description":"USV Portfolio",
                    "num_tokens":6,
                    "avg_price_change":-1.3789056983333332,
                    "market_cap":934447245793.6099,
                    "market_cap_change":-1.3703666666666667,
                    "volume":36068031542.46819,
                    "volume_change":-4.2925,
                    "last_updated":"2021-03-26T23:01:45.131Z"
                },{
                    "id":"605e2d3ed41eae1066535f7d",
                    "name":"Winklevoss Capital Portfolio",
                    "title":"Winklevoss Capital Portfolio",
                    "description":"Winklevoss Capital Portfolio",
                    "num_tokens":6,
                    "avg_price_change":-2.10185371,
                    "market_cap":936171322351.36,
                    "market_cap_change":-2.06885,
                    "volume":36386015907.19515,
                    "volume_change":-12.937,
                    "last_updated":"2021-11-10T17:49:59.639Z"
                },{
                    "id":"605e2d0f6507f27280c38981",
                    "name":"1Confirmation Portfolio",
                    "title":"1Confirmation Portfolio",
                    "description":"1Confirmation Portfolio",
                    "num_tokens":9,
                    "avg_price_change":-1.7490144766666664,
                    "market_cap":944129338690.5901,
                    "market_cap_change":-2.0415333333333336,
                    "volume":36619908448.7844,
                    "volume_change":-13.1559,
                    "last_updated":"2021-03-26T22:58:15.404Z"
                },{
                    "id":"605e2ce9d41eae1066535f7c",
                    "name":"a16z Portfolio",
                    "title":"a16z Portfolio",
                    "description":"a16z Portfolio",
                    "num_tokens":24,
                    "avg_price_change":-0.7219299900000002,
                    "market_cap":978299245464.24,
                    "market_cap_change":1.2020652173913047,
                    "volume":39576020727.28548,
                    "volume_change":-2.312891304347822,
                    "last_updated":"2021-11-10T17:23:01.089Z"
                },{
                    "id":"605e2cc16507f27280c38980",
                    "name":"Alameda Research Portfolio",
                    "title":"Alameda Research Portfolio",
                    "description":"Alameda Research Portfolio",
                    "num_tokens":61,
                    "avg_price_change":-0.0036434262711864387,
                    "market_cap":1012851799417.3201,
                    "market_cap_change":0.24725254237288147,
                    "volume":41464724912.36754,
                    "volume_change":-0.6337169491525432,
                    "last_updated":"2021-03-26T22:52:34.852Z"
                },{                    
                    "id":"605e2c4bd41eae1066535f7a",
                    "name":"Huobi Capital Portfolio",
                    "title":"Huobi Capital Portfolio",
                    "description":"Huobi Capital Portfolio",
                    "num_tokens":20,
                    "avg_price_change":-0.2563455044444444,
                    "market_cap":936403832695.31,
                    "market_cap_change":-0.25633333333333325,
                    "volume":36240831029.321625,
                    "volume_change":-4.245222222222223,
                    "last_updated":"2021-11-10T17:56:37.775Z"
                },{
                    "id":"605e2bbc6507f27280c3897f",
                    "name":"Galaxy Digital Portfolio",
                    "title":"Galaxy Digital Portfolio",
                    "description":"Galaxy Digital Portfolio",
                    "num_tokens":12,
                    "avg_price_change":-0.5445794672727273,
                    "market_cap":732323650841.8198,
                    "market_cap_change":-0.4521272727272729,
                    "volume":25737834925.23995,
                    "volume_change":-11.693636363636363,
                    "last_updated":"2021-03-26T21:54:35.334Z"
                },{
                    "id":"605e2b4dd41eae1066535f76",
                    "name":"Framework Ventures Portfolio",
                    "title":"Framework Ventures Portfolio",
                    "description":"Framework Ventures Portfolio",
                    "num_tokens":16,
                    "avg_price_change":0.9251943331249998,
                    "market_cap":945142095728.3,
                    "market_cap_change":1.0363562499999999,
                    "volume":37528487237.2198,
                    "volume_change":-6.400362499999999,
                    "last_updated":"2021-11-10T17:58:35.640Z"
                },{
                    "id":"605e2b2c6507f27280c3897e",
                    "name":"Fabric Ventures Portfolio",
                    "title":"Fabric Ventures Portfolio",
                    "description":"Fabric Ventures Portfolio",
                    "num_tokens":18,
                    "avg_price_change":-1.2234347305882356,
                    "market_cap":944623038382.14,
                    "market_cap_change":-1.2296235294117648,
                    "volume":36933107384.44832,
                    "volume_change":-18.771770588235295,
                    "last_updated":"2021-03-26T21:44:18.374Z"
                },{
                    "id":"605e2b07d41eae1066535f75",
                    "name":"Electric Global Portfolio",
                    "title":"Electric Global Portfolio",
                    "description":"Electric Global Portfolio",
                    "num_tokens":15,
                    "avg_price_change":-1.3049925506666666,
                    "market_cap":943219240492.3499,
                    "market_cap_change":-1.1594200000000001,
                    "volume":36785119775.526024,
                    "volume_change":-13.863926666666664,
                    "last_updated":"2021-03-26T21:44:15.738Z"
                },{
                    "id":"605e2acf6507f27280c3897d",
                    "name":"DragonFly Capital Portfolio",
                    "title":"DragonFly Capital Portfolio",
                    "description":"DragonFly Capital Portfolio",
                    "num_tokens":17,
                    "avg_price_change":-0.09623828941176467,
                    "market_cap":945278510182.99,
                    "market_cap_change":0.32182941176470586,
                    "volume":37438506436.32879,
                    "volume_change":-17.1876,
                    "last_updated":"2021-03-26T21:34:54.534Z"
                },{
                    "id":"605e2a98d41eae1066535f74",
                    "name":"DCG Portfolio",
                    "title":"DCG Portfolio",
                    "description":"DCG Portfolio",
                    "num_tokens":24,
                    "avg_price_change":-1.5724412143478261,
                    "market_cap":944855146853.3,
                    "market_cap_change":0.8133478260869565,
                    "volume":37247742262.145226,
                    "volume_change":23.060582608695654,
                    "last_updated":"2021-03-26T21:28:13.816Z"
                },{
                    "id":"605e2a01d41eae1066535f71",
                    "name":"CMS Holdings Portfolio",
                    "title":"CMS Holdings Portfolio",
                    "description":"CMS Holdings Portfolio",
                    "num_tokens":28,
                    "avg_price_change":2.251023242608696,
                    "market_cap":965617113126.4801,
                    "market_cap_change":2.672413043478261,
                    "volume":40237714963.72645,
                    "volume_change":-11.743695652173914,
                    "last_updated":"2021-03-26T21:14:27.160Z"
                },{
                    "id":"605e29ad6507f27280c3897c",
                    "name":"BoostVC Portfolio",
                    "title":"BoostVC Portfolio",
                    "description":"BoostVC Portfolio",
                    "num_tokens":15,
                    "avg_price_change":-2.4260575319999997,
                    "market_cap":946986582671.56,
                    "market_cap_change":-2.5913800000000005,
                    "volume":37048393078.39902,
                    "volume_change":-13.402726666666666,
                    "last_updated":"2021-03-26T20:55:03.775Z"
                },{
                    "id":"605e2967d41eae1066535f70",
                    "name":"Blockchain Capital Portfolio",
                    "title":"Blockchain Capital Portfolio",
                    "description":"Blockchain Capital Portfolio",
                    "num_tokens":19,
                    "avg_price_change":-0.23893543105263154,
                    "market_cap":949248658388.27,
                    "market_cap_change":-0.3610789473684209,
                    "volume":37663007477.39515,
                    "volume_change":-23.898347368421053,
                    "last_updated":"2021-03-26T20:50:42.678Z"
                },{
                    "id":"6051abf38a9b3f285eec4d3f",
                    "name":"Binance Labs Portfolio",
                    "title":"Binance Labs Portfolio",
                    "description":"Binance Labs Portfolio",
                    "num_tokens":39,
                    "avg_price_change":0.9643222464705881,
                    "market_cap":950299927432.13,
                    "market_cap_change":0.5028676470588235,
                    "volume":38464986189.354805,
                    "volume_change":0.35603235294117597,
                    "last_updated":"2021-11-10T10:31:26.079Z"
                },{
                    "id":"604f2775ebccdd50cd175fdb",
                    "name":"Polychain Capital Portfolio",
                    "title":"Polychain Capital Portfolio",
                    "description":"Polychain Capital Portfolio",
                    "num_tokens":27,
                    "avg_price_change":-0.841362383076923,
                    "market_cap":961379625142.0701,
                    "market_cap_change":-0.13536538461538472,
                    "volume":38768331599.18333,
                    "volume_change":-22.04255,
                    "last_updated":"2021-11-10T10:50:04.888Z"
                },{
                    "id":"604f2774ebccdd50cd175fda",
                    "name":"Three Arrows Capital Portfolio",
                    "title":"Three Arrows Capital Portfolio",
                    "description":"Three Arrows Capital Portfolio",
                    "num_tokens":35,
                    "avg_price_change":0.8131935697058827,
                    "market_cap":956551996499.7902,
                    "market_cap_change":1.0333411764705884,
                    "volume":38843585027.60074,
                    "volume_change":-10.901332352941177,
                    "last_updated":"2021-11-10T10:50:14.385Z"
                },{
                    "id":"604f2772ebccdd50cd175fd9",
                    "name":"Coinbase Ventures Portfolio",
                    "title":"Coinbase Ventures Portfolio",
                    "description":"Coinbase Ventures Portfolio",
                    "num_tokens":54,
                    "avg_price_change":0.012555707708333438,
                    "market_cap":976942027760.6299,
                    "market_cap_change":1.9521604166666666,
                    "volume":44452377374.16135,
                    "volume_change":6.970399999999998,
                    "last_updated":"2021-11-10T10:50:19.934Z"
                }
            ])

            return 'Success'
        }
        getToken()
    }, [])

    return (
        <>
        {token !== undefined ? (
        // <div className='info-container'>
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
    // </div>

        ) : (
            <></>
        )}
        </>


        // <div className='info-container'>
        //     <Card className='mx-auto col-10'>
        //         <CardBody>
        //             <CardTitle className='text-start d-flex align-items-center'>
        //                 {/* <div className='d-inline display-3 me-3'>{token.name}</div>
        //                 <div className='d-inline display-5 me-3'>({token.symbol})</div> */}


        //                 <img src={token.logo} 
        //                      alt={token.name} 
        //                      className='' 
        //                 />
        //                 <div className='d-inline display-3 ms-3'>{token.name}</div>
        //                 <div className='d-inline display-5 ms-3'>({token.symbol})</div>
        //             </CardTitle>

        //             <div className='mt-4'>
        //                 <CryptoChartWidget />
        //             </div>

        //             <div className='col-10 mx-auto mt-4'>
        //                 <CardSubtitle className='text-start fs-3'>
        //                     What is {token.name}?
        //                 </CardSubtitle>
        //                 <CardText className='text-start mx-3'>
        //                     {token.description}
        //                 </CardText>
        //             </div>

        //             {/* <CardSubtitle className='text-start display-5'>
        //                 ({tokenInfo.symbol})
        //             </CardSubtitle> */}
        //         </CardBody>
        //     </Card>
        // </div>
    )
}

export default AssetDetails