import React, { useState } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/esm/Spinner'
import Userfront from '@userfront/react'
import ReactMonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css'

const AddBill = ({returnToDefault, refetch, refetchDue}) => {

    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState(new Date().getMonth() === 0 ? new Date().getMonth()+1 : new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/bills`, {
            name: name,
            month: month,
            year: year,
            paid: false,
            amount: amount,
            arrival: true,
        }, { 
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => res.status === 200 ? 
            (() => setName(''), setLoading(false)) : alert('ERR')).finally(() => refetch(), refetchDue(), returnToDefault())
        } catch(err) {
            console.error(err)
        }
    }

    return(
        <div>
            <div className="m-6 flex flex-row justify-between w-full">
            <h4 className="inline-block">Period</h4>
            <ReactMonthPickerInput
                inputProps={{className: 'w-full'}}
                year={new Date().getFullYear()}
                month={new Date().getMonth()-1}
                onChange={function(maskedValue, selectedYear, selectedMonth) {
                    setMonth(parseInt(selectedMonth+1))
                    setYear(parseInt(selectedYear))
                }}
                />
            </div>
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <label className="font-bold mb-2 text-gray-800">Bill Name</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label className="font-bold mb-2 text-gray-800">Bill Amount</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button className="w-full bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" type="submit" onClick={handleSubmit}>
                    {loading ? 
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Adding...</span>
                        </Spinner>
                    :
                        'Add'
                        }
                </button>
                <button className="w-full bg-transparent text-black" onClick={() => returnToDefault()}>Cancel</button>
            </form>
        </div>
    )
}

export default AddBill
