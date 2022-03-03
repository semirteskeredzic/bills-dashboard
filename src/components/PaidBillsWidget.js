import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { formatter } from '../currency'

const PaidBillsWidget = ({data, refetchpaid}) => {

    return(
        <div className="p-3 relative w-full">
            <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={() => refetchpaid()} ><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <h1>Paid bills</h1>
            {data?.slice(0,3).map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-4" key={bill._id}>
                   <li>Name: {bill.name}</li>
                   <li>Month: {bill.month}</li>
                   <li>Year: {bill.year}</li>
                   <li>Amount: {!isNaN(bill.amount) ? formatter.format(bill.amount) : 'Not a number'}</li>
               </ul>
           ))}
            <div className="text-center pt-2">
            {data?.length > 3 ? <Link className="no-underline text-center text-base text-black hover:text-blue-700" to="/paidbills">See More</Link> : null}
           </div>
        </div>
    )
}

export default PaidBillsWidget