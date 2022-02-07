import React, {useState} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies()

    const loginUser = (e) => {
        e.preventDefault()
        let payload = {email: email, password: password}
        axios.post('http://localhost:8000/login', payload).then(res => console.log(res.headers))
    }


    return (
        <div>
            <form>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={(e) => loginUser(e)}>Login</button>
            </form>
        </div>
    )
}

export default Login