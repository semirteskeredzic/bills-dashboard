import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import { userContext } from '../userContext';

const LoginComponent = () => {

    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    // const [user, setUser] = useState()

    let navigate = useNavigate()

    // function validateUser(res) {
    //     return new Promise(function(resolve, reject) {
    //         if(res.status === 200) {
    //             setUser(res.data)
    //             resolve(user)
    //         } else {
    //             return reject
    //         }
    //     });
    // }

    const loginUser = (e) => {
        setLoading(true)
        e.preventDefault()
        let payload = {email: email, password: password}
        axios.post('https://billsapi.onrender.com/login', payload).then(res => res.status === 200 ? (setLoading(false), navigate('/')) : navigate('/register'))
    }   


    return (
        <userContext.Provider value={user}>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <h1 className="font-bold mb-5 text-gray-800 text-center">Login</h1>
                    <label className="font-bold mb-2 text-gray-800">Email</label>
                    <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="font-bold mb-2 text-gray-800">Password</label>
                    <input className="w-full appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 my-2 rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="w-full bg-blue-500 shadow-sm rounded hover:bg-blue-600 text-white my-4 py-2 px-4" type="submit" onClick={(e) => loginUser(e)}>
                        {loading ?
                            <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> :
                        'Login'
                        }
                    </button>
                </form>
            </div>
        </userContext.Provider>
    )
}

export default LoginComponent