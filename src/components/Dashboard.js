import React, { useEffect, useState } from 'react'
import CreateBill from './CreateBill'
import PaidBillsWidget from './PaidBillsWidget'
import UnpaidBillsWidget from './UnpaidBillsWidget'

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user')
        if(userLoggedIn !== null) setLoggedIn(true)
    },[])


    return (
        <div className="mt-10 pb-11">
            {loggedIn 
            ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="w-full md:h-[33.75rem] bg-white rounded-md shadow-md" >
                <CreateBill />
                </section>
                <section className="w-full md:h-[33.75rem] bg-white rounded-md shadow-md">
                <UnpaidBillsWidget />
                </section>
                <section className="w-full md:h-[33.75rem] bg-white rounded-md shadow-md">
                <PaidBillsWidget />
                </section>
                
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