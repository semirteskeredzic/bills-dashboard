import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from './components/UserComponent';
import UnpaidBillsList from './components/UnpaidBillsList';
import PaidBillsList from './components/PaidBillsList';
import Navigation from './components/Navigation';


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<LoginComponent/>} />
            <Route path="register" element={<RegisterComponent/>} />
            <Route path="/user" element={<UserComponent/>} />
            <Route path="/unpaidbills" element={<UnpaidBillsList/>} />
            <Route path="/paidbills" element={<PaidBillsList/>} />
          </Routes>
      </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
