import React from 'react'
import CreateBill from './CreateBill'
import PaidBillsWidget from './PaidBillsWidget'
import UnpaidBillsWidget from './UnpaidBillsWidget'
import Userfront from '@userfront/react'
import useAxios from 'axios-hooks'
import Spinner from 'react-bootstrap/esm/Spinner'
import BillStatsWidget from './BillStatsWidget'
import UtilityCompanyWidget from './UtilityCompanyWidget'
import UtilityCompanyList from './UtilityCompaniesList'

const Dashboard = () => {

    const currentTenant = Userfront.user.tenantId

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

    // Total Due Unpaid widget

    const [{data: dueData, loading: dueLoading}, dueRefetch] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/duebills`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        },
    )

    // Total Paid

    const [{data: totalPaidData, loading: totalPaidLoading}] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/paidbillstotal`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        },
    )

    // List of Utility Companies

    const [{data: companyListData, loading: companyListLoading}, refetchCompanies] = useAxios(
        {
            url: `${process.env.REACT_APP_API_URL}/utilitycompanies`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
            }
        },
    )

    return (
        <div className="mt-10 pb-11">
         {Userfront.tokens.accessToken 
            ? 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
                <section className="w-full md:h-[33.75rem] bg-white rounded-md shadow-md" >
                <CreateBill refetchunpaid={unpaidRefetch} refetchDue={dueRefetch} companyData={companyListData} />
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                {unpaidLoading ? <Spinner className="m-0 m-auto" animation="border" role="status" /> : <UnpaidBillsWidget data={unpaidData} companyData={companyListData} error={unpaidError} refetchunpaid={unpaidRefetch} refetchpaid={paidRefetch} />}
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                {paidLoading ? <Spinner className="m-0 m-auto" animation="border" role="status" /> : <PaidBillsWidget data={paidData} error={paidError} refetchpaid={paidRefetch}  />}
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                {dueLoading || totalPaidLoading ? <Spinner className="m-0 m-auto" animation="border" role="status" /> : <BillStatsWidget data={dueData} data2={totalPaidData} />}
                </section>
                {currentTenant === '5nxgp7yb' ?
                <>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                <UtilityCompanyWidget refetch={refetchCompanies} />
                </section>
                <section className="w-full flex md:h-[33.75rem] bg-white rounded-md shadow-md">
                    <UtilityCompanyList data={companyListData} loading={companyListLoading} refetch={refetchCompanies} />
                </section>
                </>
                : null}
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