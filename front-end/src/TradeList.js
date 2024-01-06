import React from "react";
import { Table } from "reactstrap";
import { v4 as uuid } from 'uuid';

const TradeList = ({ tradeList }) => {
    const formatDatetime = (dt) => {
        const dateStr = dt.split('T')[0]
        const dateVals = dateStr.split('-')
        const date = `${dateVals[1]}-${dateVals[2]}-${dateVals[0]}`
        return date
    }

    return (
        tradeList ? (
            <Table striped hover dark>
                <thead>
                    <tr>
                        <th className='text-start'>Coin</th>
                        <th className='text-start'>Position</th>
                        <th className='text-start'>Quantity</th>
                        <th className='text-start'>Price</th>
                        <th className='text-start'>Value</th>
                        <th className='text-start'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tradeList.map(trade => {
                        return (
                            <tr key={uuid()}>
                                <td className='text-start'>{trade.token_name}</td>
                                <td className={trade.type === 'buy' ? 'text-start text-success' : 'text-start text-danger'}>{trade.type}</td>
                                <td className='text-start'>{trade.quantity > 1 ? Number(trade.quantity).toFixed(2) : Number(trade.quantity)}</td>
                                <td className='text-start'>{`$${trade.price}`}</td>
                                <td className='text-start'>{`$${trade.quantity * trade.price}`}</td>
                                <td className='text-start'>{formatDatetime(trade.date_added)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        ) : (
            <div>Loading...</div>
        )
    )
}

export default TradeList