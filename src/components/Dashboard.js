import React from 'react'
import CreateBill from './CreateBill'
import PaidBillsWidget from './PaidBillsWidget'
import UnpaidBillsWidget from './UnpaidBillsWidget'
import Userfront from '@userfront/react'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'

const Dashboard = () => {

    // Unpaid Bills widget

    const [{data: unpaidData, loading: unpaidLoading, error: unpaidError}, unpaidRefetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/unpaidbills`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        }
    )

    // Paid Bills widget

    const [{data: paidData, loading: paidLoading, error: paidError}, paidRefetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/paidbills`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        }
    )

    return (
        <div className="mt-10 pb-11">
         {Userfront.tokens.accessToken 
            ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
                <section className="w-full md:h-[33.75rem] bg-white rounded-md shadow-md" >
                <CreateBill refetchunpaid={unpaidRefetch} />
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                {unpaidLoading ? <Spinner className="m-0 m-auto" animation="border" role="status" /> : <UnpaidBillsWidget data={unpaidData} error={unpaidError} refetchunpaid={unpaidRefetch} refetchpaid={paidRefetch} />}
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                {paidLoading ? <Spinner className="m-0 m-auto" animation="border" role="status" /> : <PaidBillsWidget data={paidData} error={paidError} refetchpaid={paidRefetch}  />}
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