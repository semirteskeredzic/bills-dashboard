import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import Cookies from 'js-cookie';
import { UserContext } from '../App';

const LoginComponent = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const updateuser = React.useContext(UserContext)

    let navigate = useNavigate()

    const loginUser = (e) => {
        setLoading(true)
        e.preventDefault()
        let payload = {email: email, password: password}
        axios.post(`${process.env.REACT_APP_API_URL}/login`, payload)
        .then(res => res.status === 200 ? (Cookies.set('user', res.data.userId), localStorage.setItem('user', res.data.userId), updateuser(),  setLoading(false),  navigate('/dashboard')) : navigate('/'))
    }   

    return (
            <div>
                <div className="flex items-center justify-center min-h-screen">
                    <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-4/5 md:w-1/2 lg:w-5/12">
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
            </div>
    )
}

export default LoginComponent