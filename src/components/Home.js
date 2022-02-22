import React, {useState} from 'react'
import LoginComponent from './LoginComponent'
import RegisterComponent from './RegisterComponent'

const Home = () => {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            <h2>Welcome to your Bills</h2>
        </div>
    )
}

export default Home