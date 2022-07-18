import React, { useEffect, useState } from "react"
import axios from 'axios'
import Userfront from '@userfront/react'
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline"

const ChangePercentage = ({bill}) => {

    const [percentageIncrease, setPercentageIncrease] = useState()
    const [percentageDecrease , setPercentageDecrease] = useState()
    const [increaseFlag, setIncreaseFlag] = useState(false)
    const [decreaseFlag, setDecreaseFlag] = useState(false)
    const [identicalFlag, setIdenticalFlag] = useState(false)
    const [notAvailableFlag, setNotAvailableFlag] = useState(false)

    useEffect(() => {
        previousBillCompareMethod(bill)
    },[bill])

    const previousBillCompareMethod = (bill) => {
        axios.get(`${process.env.REACT_APP_API_URL}/getPreviousBillCompare?utilityCompany=${bill.utilityCompany}&month=${bill.month}&year=${bill.year}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => {
            if (res.data === null) {
                setNotAvailableFlag(true)
            } else if(bill.amount > res.data.amount) {
                let diff = bill.amount - res.data.amount
                let increase = diff / res.data.amount
                let increasePercentage = increase * 100
                setIncreaseFlag(true)
                setPercentageIncrease(increasePercentage.toFixed(2) + ' %')
            } else if (bill.amount < res.data.amount) {
                let diff = res.data.amount - bill.amount
                let decrease = diff / res.data.amount
                let decreasePercentage = decrease * 100
                setDecreaseFlag(true)
                setPercentageDecrease(decreasePercentage.toFixed(2) + ' %')
            } else if (bill.amount === res.data.amount) {
                setIdenticalFlag(true)
            }
        }
        )
    }

    return (
        <>
            <span className="text-red-600 text-lg font-bold">{increaseFlag && <ArrowUpIcon className="w-4 h-4 inline-block" />}{percentageIncrease}</span>
            <span className="text-green-600 text-lg font-bold">{decreaseFlag && <ArrowDownIcon className="w-4 h-4 inline-block" />}{percentageDecrease}</span>
            {identicalFlag && <span className="text-gray-500 text-lg font-bold">0%</span>}
            {notAvailableFlag && <span className="text-gray-500 text-lg font-bold">--</span>}
        </>
    )
}

export default ChangePercentage