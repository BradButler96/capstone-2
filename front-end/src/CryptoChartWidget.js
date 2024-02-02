

const CryptoChartWidget = () => {
// Had to pay for TradingView websocket so it's just a rectangle

    return (
            <div className='mx-auto d-flex align-items-center' style={{width: '50rem', height: '30rem', backgroundColor: 'black'}}>
                <div className='text-center px-5' style={{color: 'white', fontSize: '2rem'}}>
                    Chart API was charging money for the data so it's just this rectangle, sorry!
                </div>
            </div>
    )
}

export default CryptoChartWidget