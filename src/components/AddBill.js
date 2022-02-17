import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import axios from 'axios'
import Cookies from 'js-cookie'
import Spinner from 'react-bootstrap/esm/Spinner'

const AddBill = ({returnToDefault}) => {

    const [startDate, setStartDate] = useState(new Date())
    const [previousMonth, setPreviousMonth] = useState()
    const [currentYear, setCurrentYear] = useState()
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [userCookie, setUserCookie] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        const initialCookie = Cookies.get('user')
        const cookie = initialCookie.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
        setUserCookie(cookie)
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/bills`, {
            name: name,
            month: previousMonth,
            year: currentYear,
            paid: false,
            amount: amount,
            arrival: true,
            user: userCookie
        }).then(res => res.status === 200 ? 
            () => setName('') : alert('ERR')).finally(() => setLoading(false), returnToDefault())
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const month = getMonth(startDate)-1
        const year = getYear(startDate)
        setPreviousMonth(month + 1)
        setCurrentYear(year)
    },[startDate])

    return(
        <div>
            <div className="m-6 flex flex-row justify-between w-full">
            <h4 className="inline-block">Period</h4>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                dateFormat="MM yy"
                className="ml-5 border-2"
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
            </form>
        </div>
    )
}

export default AddBill