import React, {useState} from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import { PencilIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { formatter } from '../currency'
import Userfront from '@userfront/react'
import { formatDate, currentDate } from '../helpers/date'

const UnpaidBillsList = () => {

    axios.defaults.withCredentials = true
    const [payLoading, setPayLoading] = useState(false)

    const navigate = useNavigate()

    const [{ data, loading, error }, refetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/unpaidbills`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        })

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    const billsData = Object.entries(data).sort().reverse()

    const payBill = (prop) => {
        setPayLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`, {paid: true, dateOfPayment: currentDate}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => res.status === 200 ? (console.log('success',res), setPayLoading(false), refetch()): console.log(res)).catch(err => console.log(err))
    }

    return (
        <div className="p-3 relative">
            <div className="absolute right-2 top-0 justify-center align-middle flex"> 
                <button className="my-4 py-2 px-4" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
                <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={() => navigate(-1)}>Back</button>
            </div> 
            <h1>Unpaid bills</h1>
            {Object.values(billsData)?.map(billSection => (
                <>
                <h1>{billSection[0]}</h1>
                {Object.values(billSection[1]).slice(0,3).map(bill => (
                <ul className="rounded shadow-sm border border-gray-200 p-2 my-5 relative bg-white" key={bill._id}>
                    <li>Name: {bill.name}</li>
                    <li>Month: {bill.month}</li>
                    <li>Year: {bill.year}</li>
                    <li>Amount: {formatter.format(bill.amount)}</li>
                    <li>Arrived at: {formatDate(bill.dateOfArrival)}</li>
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
                </>
           ))}
        </div>
    )   
}

export default UnpaidBillsList