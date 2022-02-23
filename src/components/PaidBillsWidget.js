import React, { useState, useEffect } from 'react'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import Cookies from 'js-cookie'
import { RefreshIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { formatter } from '../currency'

const PaidBillsWidget = () => {

    const [userCookie, setUserCookie] = useState()

    useEffect(() => {
        const initialCookie = Cookies.get('user')
        const cookie = initialCookie.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
        setUserCookie(cookie)
    },[])

    const [{data, loading, error}, refetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/paidbills`,
            params: {userId: userCookie}
        },
        {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
        }})

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    return(
        <div className="p-3 relative">
            <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
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