import React, {useState} from 'react'
import axios from 'axios'

const AddBill = () => {

    const [name, setName] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            axios.post('https://billsapi.onrender.com/bills', {
            name: name,
            month: month,
            year: year
        }).then(res => res.status === 200 ? () => {
            setName('')
            setMonth('')
            setYear('')
        } : alert('ERR'))
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <label className="font-bold mb-2 text-gray-800">Bill Name</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <label className="font-bold mb-2 text-gray-800">Bill Month</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
                <label className="font-bold mb-2 text-gray-800">Bill Year</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                <button className="w-full bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" type="submit" onClick={handleSubmit}>Add</button>
            </form>
        </>
    )
}

export default AddBill