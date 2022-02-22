import './App.css';
import Home from './components/Home';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from './components/UserComponent';
import UnpaidBillsList from './components/UnpaidBillsList';
import PaidBillsList from './components/PaidBillsList';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation'
import AuthService from './services/auth.service';
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

function App() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = AuthService.getCurrentUser()
    if(user) {
      setCurrentUser(user)
    }
  },[])

  const updateUser = () => {
    const user = AuthService.getCurrentUser()
    setCurrentUser(user)
  }

  const logOutUser = () => {
    AuthService.logout()
    setCurrentUser(undefined)
    navigate('/')
  }

  const logInUser = () => {
    navigate('/login')
  }

  const signUpUser = () => {
    setCurrentUser(undefined)
    navigate('/register')
  }

  return (
      <div>       
          <Navigation user={currentUser} logout={logOutUser} login={logInUser} signup={signUpUser} />
          <div className="container mt-3">
            <UserContext.Provider value={updateUser}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<LoginComponent />} />
                <Route path="register" element={<RegisterComponent/>} />
                <Route path="/user" element={<UserComponent/>} />
                <Route path="/unpaidbills" element={<UnpaidBillsList/>} />
                <Route path="/paidbills" element={<PaidBillsList/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
              </Routes>
            </UserContext.Provider>
          </div>
      </div>
  );
}

export default App;
