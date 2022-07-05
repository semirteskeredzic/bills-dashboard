import React, { useState } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/esm/Spinner'
import Userfront from '@userfront/react'
import ReactMonthPickerInput from 'react-month-picker-input'
import 'react-month-picker-input/dist/react-month-picker-input.css'
import { XIcon } from '@heroicons/react/outline'

const AddBill = ({returnToDefault, refetch, refetchDue, companies}) => {

    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)
    const [month, setMonth] = useState(new Date().getMonth() === 0 ? new Date().getMonth()+1 : new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [utilCompany, setUtilCompany] = useState()
    const [selectedUtilCompany, setSelectedUtilCompany] = useState()
    const [showName, setShowName] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/bills`, {
            name: name,
            month: month,
            year: year,
            paid: false,
            utilityCompany: selectedUtilCompany,
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
            <div className="my-4 md:m-4 flex flex-row justify-between w-auto">
            <h4 className="inline-block">Period</h4>
            <div className="w-1/2">
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
            </div>
            <form className="bg-white rounded md:px-8 pb-4 mb-4">
            <label className="font-bold mb-2 text-gray-800">Utility Company</label>
                <select value={utilCompany} onChange={(e) => {
                    setUtilCompany(e.target.value)
                    setSelectedUtilCompany(e.target.selectedOptions[0].dataset.id)
                    }} id="company" name="company" className="w-full border border-gray-200 p-2 rounded-lg h-[42px] my-2">
                    <option></option>
                    {companies.map(company => {
                        return <option key={company._id} value={company.name} data-id={company._id}>{company.name}</option>
                    })}
                </select>
                <label className="font-bold mb-2 text-gray-800">Bill Amount</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                {showName ?
                <div className="relative">
                <button onClick={() => setShowName(!showName)}><XIcon className="w-4 right-0 top-2 absolute" /></button>
                <label className="font-bold mb-2 text-gray-800">Bill Name</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                :
                <button className="w-full shadow-sm border-gray-200 p-2 my-4 text-gray-300 border rounded-lg hover:bg-gray-100" onClick={() => setShowName(!showName)}>Optional: Enter a name</button>
                }
                <button className="w-full bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-2 py-2 px-4" type="submit" onClick={handleSubmit}>
                    {loading ? 
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Adding...</span>
                        </Spinner>
                    :
                        'Add'
                        }
                </button>
                <button className="w-full bg-transparent text-black border p-2 rounded shadow-sm" onClick={() => returnToDefault()}>Cancel</button>
            </form>
        </div>
    )
}

export default AddBill
