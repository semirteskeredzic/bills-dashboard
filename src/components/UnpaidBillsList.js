import React, { useEffect} from 'react'
import axios from 'axios'
// import useAxios from 'axios-hooks'
// import Spinner from 'react-bootstrap/esm/Spinner'

const UnpaidBillsList = () => {

    // const config = { headers: { 'Content-Type': 'application/json', },withCredentials: true,}

    useEffect(() => {
        fetch('https://billsapi.onrender.com/bills', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}, 
            credentials: 'include',
        })
            .then(response => {console.log(response)}).catch(err => console.log(err));
        
//    axios.get('http:/localhost:8000/bills',{withCredentials: true})
//   .then((data) => console.log(data))
//   .then((result) => console.log(result))
//   .catch((err) => console.log('[Control Error ] ', err))
        
    }, [])    

    const refresh = () => {
        axios.get('https://billsapi.onrender.com/bills',{withCredentials: true})
  .then((data) => console.log(data))
  .then((result) => console.log(result))
  .catch((err) => console.log('[Control Error ] ', err))
    }

    // const [{ data, loading, error }, refetch] = useAxios(
    //     'http://localhost:8000/bills',{
    //         withCredentials: true,
    //         headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
    // }})

    // if (loading) return <Spinner animation="border" role="status" />
    // if (error) return <div>Error</div>

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={refresh}>Refresh</button>
           {/* {data?.map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5" key={bill._id}>
                   <li>{bill.name}</li>
                   <li>{bill.month}</li>
                   <li>{bill.year}</li>
                   <li>{bill.paid}</li>
               </ul>
           ))} */}
        </div>
    )   
}

export default UnpaidBillsList