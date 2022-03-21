import React from 'react'
import { formatter } from '../currency'

const BillStatsWidget = ({data, data2}) => {

    return(
        <div className="p-3 relative w-full">
            {/* <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={() => refetchpaid()} ><RefreshIcon className="w-7 hover:text-blue-700" /></button> */}
            <h1>Bill Stats</h1>
            <div className="mt-3">
                <h4>Total Due: {formatter.format(data)}</h4>
                <h4>Total Paid: {formatter.format(data2)} </h4>
            </div>
        </div>
    )
}

export default BillStatsWidget
