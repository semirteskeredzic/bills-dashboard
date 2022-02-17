import React, {useEffect, useState} from 'react'
import axios from 'axios'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import Cookies from 'js-cookie'

const UnpaidBillsList = () => {

    axios.defaults.withCredentials = true
    const [payLoading, setPayLoading] = useState(false)
    const [userCookie, setUserCookie] = useState()

    useEffect(() => {
        const initialCookie = Cookies.get('user')
        const cookie = initialCookie.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
        setUserCookie(cookie)
    },[])

    const [{ data, loading, error }, refetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/unpaidbills`,
            params: { userId: userCookie},
        },
        {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })

    

    if (loading) return <Spinner animation="border" role="status" />
    if (error) return <div>Error</div>

    const payBill = (prop) => {
        setPayLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/bills/${prop._id}`, {paid: true}).then(res => res.status === 200 ? (console.log('success',res), setPayLoading(false), refetch()): console.log(res)).catch(err => console.log(err))
    }

    return (
        <div className="p-3">
            <button className="bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" onClick={refetch}>Refresh</button>
            <h1>UNPAID BILLS</h1>
            {data?.map(bill => (
               <ul className="rounded shadow-sm border border-gray-200 p-2 my-5" key={bill._id}>
                   <li>{bill.name}</li>
                   <li>{bill.month}</li>
                   <li>{bill.year}</li>
                   <li>{bill.paid}</li>
                   <button onClick={() => payBill(bill)}>
                        {payLoading ? 
                            <Spinner animation="border" role="status">
                            <span className="visually-hidden">Paying...</span>
                            </Spinner>
                        :
                            'Pay Bill'
                        }
                    </button>
               </ul>
           ))}
        </div>
    )   
}

export default UnpaidBillsList