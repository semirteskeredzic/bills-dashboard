import React, { useState } from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/esm/Spinner'
import Userfront from '@userfront/react'
import { countries } from '../helpers/countries'
import { utilityTypes } from '../helpers/utilityTypes'
// import { RefreshIcon } from '@heroicons/react/outline'

const UtilityCompanyWidget = ({refetch}) => {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [icon, setIcon] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')

    const createUtilityCompany = (e) => {
        e.preventDefault()
        setLoading(true)
        try {
        axios.post(`${process.env.REACT_APP_API_URL}/utilitycompany`, {
            name: name,
            type: type,
            description: description,
            address: address,
            city: city,
            country: country,
            icon: icon,
            phone: phone,
            email: email,
            website: website
        },{ 
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Userfront.tokens.accessToken}`
        }}).then(res => {
            if (res.status === 200) {
                refetch()
            }
        }).finally(() => setLoading(false), setName(''), setType(''), setAddress(''), setDescription(''), setCity(''), setIcon(''), setCountry(''), setPhone(''), setEmail(''), setWebsite(''))}
        catch(err) {
            console.error(err)
        }
    }


    return (
        <div className="p-4 h-104 relative w-full overflow-auto">
            {/* <button className="my-4 py-2 px-4 right-2 top-0 absolute" onClick={refetchcompanies}><RefreshIcon className="w-7 hover:text-blue-700" /></button> */}
            <h1>Create Utility Company</h1>
            <form onSubmit={(e) => createUtilityCompany(e)}>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="type">Type</label>
                        <select name="type" value={type} onChange={(e) => {
                            setType(e.target.value) 
                            setIcon(e.target.selectedOptions[0].dataset.icon)
                            }} id="type" className="w-full border border-gray-200 p-2 rounded-lg h-[42px]">
                            {utilityTypes.map(utilityType => (
                                <option key={utilityType.type} value={utilityType.type} data-icon={utilityType.icon}>{utilityType.type}</option>
                            ))}
                        </select>
                        </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} id="address" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} id="city" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="country">Country</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} id="country" name="country" className="w-full border border-gray-200 p-2 rounded-lg h-[42px]">
                            {countries.map(country => {
                                return <option key={country.code} value={country.name}>{country.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="phone">Phone</label>
                        <input type="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  id="email" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <label htmlFor="website">Website</label>
                        <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} id="website" className="w-full border border-gray-200 p-2 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 p-2">
                        <button className="my-4 py-2 px-4 right-9 uppercase bottom-0 bg-blue-700 rounded-lg shadow-sm hover:bg-blue-500 text-white">
                            {loading ? <Spinner animation="border" variant="primary" /> : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )   
}

export default UtilityCompanyWidget