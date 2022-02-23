import React, {useEffect, useState} from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import Cookies from 'js-cookie'
import { PencilIcon, RefreshIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { formatter } from '../currency'

const UnpaidBillsWidget = () => {

    axios.defaults.withCredentials = true
    const [payLoading, setPayLoading] = useState(false)
    const [userCookie, setUserCookie] = useState()
    const [modalDelete, setModalDelete] = useState(false)

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

    const deleteBill = (prop) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`).then(res => res.ok ? (console.log('Bill deleted'), refetch()) : console.log(res)).catch(err => console.error(err))
    }

    const deleteModal = (prop) => {
        setModalDelete(!modalDelete)
        // setCurrent
    }

    return (
        <div className="p-4 h-104 relative">
            <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <h1>Unpaid Bills</h1>
            {data?.slice(0,2).map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5 relative" key={bill._id}>
                   <li>Name: {bill.name}</li>
                   <li>Month: {bill.month}</li>
                   <li>Year: {bill.year}</li>
                   <li>Amount: {formatter.format(bill.amount)}</li>
                   <div className="absolute top-1/3 right-2 flex">
                    <button className="pr-2" onClick={() => deleteModal(bill)}><TrashIcon className="w-7 self-center hover:text-blue-700" /></button>
                    <button className="pr-2"><PencilIcon className="w-7 self-center hover:text-blue-700" /></button>
                     <button className="bg-blue-500 hover:bg-darken text-white p-2 rounded shadow-sm hover:bg-blue-600" onClick={() => payBill(bill)}>
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
           <div className="text-center">
           {data?.length > 2 ? <Link className="no-underline text-center text-base text-black hover:text-blue-700" to="/unpaidbills">See More</Link> : null}
           </div>

           {/* Delete Product Modal */}
            <div class={` ${!modalDelete ? 'hidden' : 'visible'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="popup-modal">
                <div class="relative px-4 w-full max-w-md h-full md:h-auto m-0 m-auto">
                    {/* Modal content */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 mt-[50%]">
                        {/* Modal header */}
                        <div class="flex justify-end p-2">
                            <button type="button" class="text-gray-400 bg-transparent hover:text-blue-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setModalDelete(false)}>
                                <XIcon className="w-5" />  
                            </button>
                        </div>
                        {/* Modal body */}
                        <div class="p-6 pt-0 text-center">
                            <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this bill?</h3>
                            <div className="flex flex-row justify-evenly">
                            <button type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-slate-200 dark:hover:bg-gray-600">No, cancel</button>
                            <button type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default UnpaidBillsWidget