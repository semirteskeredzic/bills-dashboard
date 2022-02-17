import React, { useEffect, useState } from 'react'
import CreateBill from './CreateBill'
import PaidBillsList from './PaidBillsList'
import UnpaidBillsList from './UnpaidBillsList'

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user')
        if(userLoggedIn !== null) setLoggedIn(true)
    },[])


    return (
        <div className="mt-10">
            {loggedIn 
            ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CreateBill />
                <UnpaidBillsList />
                <PaidBillsList />
            </div>
            :
            <div>
                <span>Please Log In to continue!</span>
            </div>
            }
            
        </div>
    )
}

export default Dashboard