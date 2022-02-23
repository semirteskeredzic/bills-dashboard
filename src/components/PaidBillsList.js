import React, { useState, useEffect } from 'react'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { RefreshIcon } from '@heroicons/react/outline'
import { formatter } from '../currency'

const PaidBillsList = () => {

    const [userCookie, setUserCookie] = useState()

    const navigate = useNavigate()

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
            <div className="absolute right-2 top-0 justify-center align-middle flex"> 
            <button className="my-4 py-2 px-4" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={() => navigate(-1)}>Back</button>
            </div> 
            <h1>Paid bills</h1>
            {data?.map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5" key={bill._id}>
                   <li>Name: {bill.name}</li>
                   <li>Month: {bill.month}</li>
                   <li>Year: {bill.year}</li>
                   <li>Amount: {!isNaN(bill.amount) ? formatter.format(bill.amount) : 'Not a number'}</li>
               </ul>
           ))}
        </div>
    )
}

export default PaidBillsList