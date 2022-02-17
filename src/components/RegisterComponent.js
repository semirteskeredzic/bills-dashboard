import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const RegisterComponent = () => {

    let navigate = useNavigate()

    const[email,setEmail] = useState('')
    const[password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const registerUser = (e) => {
        setLoading(true)
        e.preventDefault()
        const payload = {
            email: email,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API_URL}/register`, payload).then(res => res.status === 201 ? (setLoading(false), navigate("/login")) : null)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <h1 className="font=bold mb-5 text-gray-800 text-center">Register</h1>
                <label className="font-bold mb-2 text-gray-800">Email</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="font-bold mb-2 text-gray-800">Password</label>
                <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" type="submit" onClick={(e) => registerUser(e)}>
                {loading ?
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner> :
                      'Register'
                    }
                </button>
            </form>
        </div>
    )
}

export default RegisterComponent