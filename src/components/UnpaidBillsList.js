import React, {useEffect, useState} from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import Cookies from 'js-cookie'
import { PencilAltIcon, PencilIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { formatter } from '../currency'

const UnpaidBillsList = () => {

    axios.defaults.withCredentials = true
    const [payLoading, setPayLoading] = useState(false)
    const [userCookie, setUserCookie] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const initialCookie = Cookies.get('user')
        const cookie = initialCookie.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
        setUserCookie(cookie)
    },[])

    const [{ data, loading, error }, refetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/unpaidbills`,
            params: { userId: userCookie},
        },
        {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })

    

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    const payBill = (prop) => {
        setPayLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`, {paid: true}).then(res => res.status === 200 ? (console.log('success',res), setPayLoading(false), refetch()): console.log(res)).catch(err => console.log(err))
    }

    return (
        <div className="p-3 relative">
            <div className="absolute right-2 top-0 justify-center align-middle flex"> 
                <button className="my-4 py-2 px-4" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
                <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={() => navigate(-1)}>Back</button>
            </div> 
            <h1>Unpaid bills</h1>
            {data?.map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5 relative" key={bill._id}>
                   <li>Name: {bill.name}</li>
                   <li>Month: {bill.month}</li>
                   <li>Year: {bill.year}</li>
                   <li>Amount: {formatter.format(bill.amount)}</li>
                   <div className="absolute top-1/3 right-2 flex">
                    <button className="pr-2"><TrashIcon className="w-7 self-center hover:text-blue-700" /></button>
                    <button className="pr-2"><PencilIcon className="w-7 self-center hover:text-blue-700" /></button>
                     <button className="bg-blue-400 hover:bg-darken text-white p-2 rounded shadow-sm" onClick={() => payBill(bill)}>
                        {payLoading ? 
                            <Spinner animation="border" role="status">
                            <span className="visually-hidden">Paying...</span>
                            </Spinner>
                        :
                            'Pay Bill'
                        }
                    </button>
                    </div>
               </ul>
           ))}
        </div>
    )   
}

export default UnpaidBillsList