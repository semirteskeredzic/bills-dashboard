import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { formatter } from '../currency'
import { formatDate } from '../helpers/date'

const PaidBillsWidget = ({data, refetchpaid}) => {

    const billsData = Object.entries(data).sort().reverse()

    return(
        <div className="p-3 relative w-full overflow-auto">
            <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={() => refetchpaid()} ><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <h1>Paid bills</h1>
            {Object.values(billsData)?.map(billSection => (
                <>
                <h3>{billSection[0]}</h3>
                {Object.values(billSection[1]).slice(0,3).map(bill => (
                    <ul className="rounded shadow-sm border border-gray-200 p-2 my-4" key={bill._id}>
                        <li>Name: {bill.name}</li>
                        <li>Month: {bill.month}</li>
                        <li>Year: {bill.year}</li>
                        <li>Amount: {!isNaN(bill.amount) ? formatter.format(bill.amount) : 'Not a number'}</li>
                        <li>Arrived at: {formatDate(bill.dateOfArrival)}</li>
                        <li>Paid at: {formatDate(bill.dateOfPayment)}</li>
                    </ul>
                ))}
                </>
           ))}
            <div className="text-center pt-2">
            {data?.length > 3 ? <Link className="no-underline text-center text-base text-black hover:text-blue-700" to="/paidbills">See More</Link> : null}
           </div>
        </div>
    )
}

export default PaidBillsWidget