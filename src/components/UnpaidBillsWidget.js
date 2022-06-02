import React, {useState, useRef} from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/esm/Spinner'
import { DotsVerticalIcon, RefreshIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { formatter } from '../currency'
import Userfront from '@userfront/react'
import { formatDate, currentDate } from '../helpers/date'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useOutsideClick from '../helpers/useOutsideClick'


const UnpaidBillsWidget = ({data, error, companyData,  refetchunpaid, refetchpaid}) => {

    const [payLoading, setPayLoading] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [currentItemForDeletion, setCurrentItemForDeletion] = useState()
    const [smallModal, setSmallModal] = useState(false)

    const ref = useRef()
    const modalRef = useRef()

    useOutsideClick(ref, () => {
        setSmallModal(!smallModal)
      });

    useOutsideClick(modalRef, () => {
        if(modalDelete) {
            setModalDelete(false)
        }
    })
    
    const payBill = (prop) => {
        setPayLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`, {paid: true, dateOfPayment: currentDate}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => res.ok ? console.log('success',res) : console.log(res)).catch(err => console.log(err)).finally(refetchunpaid(), refetchpaid())
    }

    const deleteBill = (prop) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => res.ok ? console.log('deleted', res) : console.log(res)).catch(err => console.error(err)).finally(refetchunpaid(), refetchpaid(), setCurrentItemForDeletion(''), setModalDelete(!modalDelete))
    }

    const deleteModal = (prop) => {
        setCurrentItemForDeletion(prop)
        setModalDelete(!modalDelete)
    }


    return (
        <div className="p-4 h-104 relative w-full overflow-auto">
            <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={refetchunpaid}><RefreshIcon className="w-7 hover:text-blue-700" /></button>
            <h1>Unpaid Bills</h1>
            {data?.slice(0,2).map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5 relative" key={bill._id}>
                   {companyData?.map(company => (
                       company._id === bill.utilityCompany ? 
                       <div key={company._id}>
                           <FontAwesomeIcon icon={`${company.icon}`} className="w-8 h-8 inline-block" />
                            <h1 className="inline-block px-4 align-super text-2xl">{company.name}</h1>
                       </div> 
                       : null
                   ))}
                   <li className="pt-2">Period: {bill.month}/{bill.year}</li>
                   <li>Amount: {formatter.format(bill.amount)}</li>
                   <li className="text-gray-400 text-xs pt-2">Arrived At: {formatDate(bill.dateOfArrival)}</li>
                   <div className="absolute top-2 right-2 flex">
                        <button onClick={() => setSmallModal(!smallModal)}><DotsVerticalIcon className='w-6'/></button>
                    </div>
                    {smallModal ? 
                        <div className='shadow-sm border-2 top-6 right-4 absolute bg-white flex-col z-10 flex' ref={ref}>
                            <button className="pr-2 text-left hover:bg-slate-100 py-2 px-4" disabled>Edit</button>
                            <button className="pr-2 text-left hover:bg-slate-100 py-2 px-4" onClick={() => {
                                deleteModal(bill); 
                                setSmallModal(!smallModal)
                            }}>Delete</button>
                        </div>
                        :
                        null
                    }
                    <div className="absolute bottom-2 right-2 flex">
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
            <div className={` ${!modalDelete ? 'hidden' : 'visible'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="popup-modal">
                <div ref={modalRef} className="relative px-4 w-full max-w-md h-full md:h-auto m-0 m-auto">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 mt-[50%]">
                        {/* Modal header */}
                        <div className="flex justify-end p-2">
                            <button type="button" className="text-gray-400 bg-transparent hover:text-blue-700 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setModalDelete(false)}>
                                <XIcon className="w-5" />  
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-6 pt-0 text-center">
                            <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this bill?</h3>
                            <div className="flex flex-row justify-evenly">
                            <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-slate-200 dark:hover:bg-gray-600" onClick={() => setModalDelete(false)}>No, cancel</button>
                            <button onClick={() => deleteBill(currentItemForDeletion)} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center mr-2">
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