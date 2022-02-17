import React, {useState} from 'react'
import LoginComponent from './LoginComponent'
import RegisterComponent from './RegisterComponent'

const Home = () => {

    const [showLogin, setShowLogin] = useState(true)

    return (
        <div>
            <h2>Welcome to your Bills</h2>
            {showLogin ? 
            <div>
                <LoginComponent />
                <span>Not registered? <button onClick={() => setShowLogin(!showLogin)}>Sign Up</button> here</span>
            </div>
            : 
            <div>
                <RegisterComponent />
                <span>Already registered? <button onClick={() => setShowLogin(!showLogin)}>Log In</button> here</span>
            </div>
            }
        </div>
    )
}

export default Home