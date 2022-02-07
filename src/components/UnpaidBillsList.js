import React, {useState, useEffect} from 'react'
import axios from 'axios'

const UnpaidBillsList = () => {

    const [bills, setBills] = useState()

    const refresh = () => {
        axios.get('https://billsapi.onrender.com/bills').then(res => setBills(res.data))
    }

    useEffect(() => {
        try{
            axios.get('https://billsapi.onrender.com/bills').then(res => setBills(res.data))
        } catch(err) {
            console.error(err)
        }
    }, []);
    

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={refresh}>Refresh</button>
           {bills?.map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5" key={bill._id}>
                   <li>{bill.name}</li>
                   <li>{bill.month}</li>
                   <li>{bill.year}</li>
                   <li>{bill.paid}</li>
               </ul>
           ))}
        </div>
    )   
}

export default UnpaidBillsList