import React, { useState } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'
import AddBill from './AddBill'

const CreateBill = ({refetchunpaid, refetchDue, companyData}) => {

    const [buttonVisible, setButtonVisible] = useState(true)
    const [addBillVisible, setAddBillVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const startAddBill = () => {
        setLoading(true)
        setButtonVisible(false)
        setAddBillVisible(true)
        setLoading(false)
    }

    const returnToDefault = () => {
        setButtonVisible(true)
        setAddBillVisible(false)
    }

    return(
        <div className="flex p-10 h-full justify-center">
            <div className="self-center">
            {buttonVisible ?
                <button 
                    onClick={startAddBill}
                    className="bg-blue-500 shadow-md rounded hover:bg-blue-600 text-2xl text-white my-4 py-2 px-4"
                >
                    {
                        loading ?
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        : 'Bill Has Arrived!'
                    }
                </button> 
                : null
            }
            </div>
            {addBillVisible ? <AddBill returnToDefault={returnToDefault} refetch={refetchunpaid} refetchDue={refetchDue} companies={companyData} /> : null}
        </div>
    )
}

export default CreateBill