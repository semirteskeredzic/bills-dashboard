import React from 'react'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'

const PaidBillsList = () => {

    const [{data, loading, error}, refetch] = useAxios(
        'http://localhost:8000/paidbills',{
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
    }})

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    return(
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/4">
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={refetch}>Refresh</button>
            <h1>PAID BILLS</h1>
            {data?.map(bill => (
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

export default PaidBillsList