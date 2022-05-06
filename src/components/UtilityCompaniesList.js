import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner } from "react-bootstrap"
import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/outline"
import Userfront from '@userfront/react'
import axios from "axios"

const UtilityCompanyList = ({data, loading, refetch}) => {

    const [modalDelete, setModalDelete] = useState(false)
    const [currentItemForDeletion, setCurrentItemForDeletion] = useState()

    const handleEditUC = (id) => {
        console.log(id)
    }

    const deleteUC = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/utilitycompany/${currentItemForDeletion}`, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => res.ok ? refetch() : console.log(res)
        )
        .catch(err => console.error(err)).finally(setModalDelete(!modalDelete))
    }

    const deleteModal = (prop) => {
        setCurrentItemForDeletion(prop)
        setModalDelete(!modalDelete)
    }

    return(
        <>
        {loading ? <Spinner className="w-5 h-5" /> :
        <div className="flex flex-wrap w-full overflow-auto p-4">
            {data.map(company => (
                
                <div key={company._id} className="w-full p-4 overflow-auto border-2 rounded-md">
                        <div className="py-4">
                            <FontAwesomeIcon icon={`${company.icon}`} className="w-10 h-10 inline-block" />
                            <h1 className="inline-block px-4 align-super">{company.name}</h1>
                        </div>
                        <p>{company.description}</p>
                        <p>{company.address}</p>
                        <p>{company.city}, {company.country}</p>
                        <p>{company.phone}</p>
                        <p>{company.email}</p>
                        <p>{company.website}</p>
                        <div>
                            <button onClick={() => handleEditUC(company._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded-full"><PencilIcon className="w-4 h-4" /></button>
                            <button onClick={() => deleteModal(company._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded-full"><TrashIcon className="w-4 h-4"/></button>
                        </div>
                </div>
            ))}
            </div>
        }
        {/* Delete Product Modal */}
        <div className={` ${!modalDelete ? 'hidden' : 'visible'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="popup-modal">
                <div className="relative px-4 w-full max-w-md h-full md:h-auto m-0 m-auto">
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
                            <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-slate-200 dark:hover:bg-gray-600">No, cancel</button>
                            <button onClick={() => deleteUC()} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center mr-2">
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

export default UtilityCompanyList