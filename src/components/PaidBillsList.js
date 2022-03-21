import React, { useState } from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import { useNavigate } from 'react-router-dom'
import { PencilIcon, RefreshIcon, TrashIcon, XIcon } from '@heroicons/react/outline'
import { formatter } from '../currency'
import Userfront from '@userfront/react'

const PaidBillsList = () => {

    const navigate = useNavigate()

    const [modalDelete, setModalDelete] = useState(false)
    const [currentItemForDeletion, setCurrentItemForDeletion] = useState()

    const deleteModal = (prop) => {
        setCurrentItemForDeletion(prop)
        setModalDelete(!modalDelete)
    }

    const [{ data, loading, error }, refetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/paidbills`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        })

        const deleteBill = (currentItemForDeletion) => {
            axios.delete(`${process.env.REACT_APP_API_URL}/bills/${currentItemForDeletion._id}`, {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }}).then(res => res.ok ? console.log(res) : console.log(res)).catch(err => console.error(err)).finally(setModalDelete(!modalDelete), refetch())
        }

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    return(
        <>
        <div className="p-3 relative">
            <div className="absolute right-2 top-0 justify-center align-middle flex"> 
            <button className="my-4 py-2 px-4" onClick={refetch}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={() => navigate(-1)}>Back</button>
            </div> 
            <h1>Paid bills</h1>
            {data?.map(bill => (
               <ul className="relative rounded shadow-sm border border-gray-200 p-2 my-5 bg-white" key={bill._id}>
                   <li>Name: {bill.name}</li>
                   <li>Month: {bill.month}</li>
                   <li>Year: {bill.year}</li>
                   <li>Amount: {!isNaN(bill.amount) ? formatter.format(bill.amount) : 'Not a number'}</li>
                   <div className="right-0 absolute top-1/3">
                        <button className="pr-2" onClick={() => deleteModal(bill)} ><TrashIcon className="w-7 self-center hover:text-blue-700" /></button>
                        <button className="pr-2" disabled><PencilIcon className="w-7 self-center text-gray-400" /></button>
                   </div>
               </ul>
           ))}
        </div>
        {/* Delete Product Modal */}
        <div className={` ${!modalDelete ? 'hidden' : 'visible'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="popup-modal">
        <div className="relative px-4 w-full max-w-md h-full md:h-auto m-0 m-auto">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 mt-[50%]">
                {/* Modal header */}
                <div className="flex justify-end p-2">
                    <button type="button" className="text-gray-400 bg-transparent hover:text-blue-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setModalDelete(!modalDelete)}>
                        <XIcon className="w-5" />  
                    </button>
                </div>
                {/* Modal body */}
                <div className="p-6 pt-0 text-center">
                    <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this bill?</h3>
                    <div className="flex flex-row justify-evenly">
                    <button type="button" onClick={() => setModalDelete(!modalDelete)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-slate-200 dark:hover:bg-gray-600">No, cancel</button>
                    <button onClick={() => deleteBill(currentItemForDeletion)} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center mr-2">
                        Yes, I'm sure
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default PaidBillsList