import './App.css';
import Home from './components/Home';
import React from 'react';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from './components/UserComponent';
import UnpaidBillsList from './components/UnpaidBillsList';
import PaidBillsList from './components/PaidBillsList';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation'
import { useNavigate } from 'react-router-dom'
import Userfront from '@userfront/react'
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBolt, faFireFlameSimple, faBarcode, faFaucet, faDumpster, faPhone, faWifi, faScrewdriverWrench, faTv } from '@fortawesome/free-solid-svg-icons'

Userfront.init('5nxgp7yb')

function App() {

  console.log(process.env.REACT_APP_LOGIN_FORM_TOOLID)
  const navigate = useNavigate()

  const LoginForm = Userfront.build({
    toolId: 'mrrnbd'
  })

  const SignupForm = Userfront.build({
    toolId: 'nrradn'
  })

  const LogoutButton = Userfront.build({
    toolId: 'dnnran'
  });

  const logInUser = () => {
    navigate('/login')
  }

  const signUpUser = () => {
    navigate('/register')
  }

  library.add(faBolt, faFireFlameSimple, faBarcode, faFaucet, faDumpster, faPhone, faWifi, faScrewdriverWrench, faTv)

  return (
      <div className="bg-blue-100 font-sans">
          <Navigation logout={<LogoutButton />} login={logInUser} signup={signUpUser} />
          <div className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<div className="mt-18 md:mt-24"><LoginForm /></div>} />
                <Route path="register" element={<div className="mt-18 md:mt-24"><SignupForm /></div>} />
                <Route path="/user" element={<UserComponent/>} />
                <Route path="/unpaidbills" element={<UnpaidBillsList/>} />
                <Route path="/paidbills" element={<PaidBillsList/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
              </Routes>
          </div>
          <Footer />
      </div>
  );
}

export default App;
