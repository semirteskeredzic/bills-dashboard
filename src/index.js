import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import {userContext} from './userContext'


ReactDOM.render(
  <React.StrictMode>
    
      <BrowserRouter>
        <nav className="shadow-sm bg-blue-300 p-3">
        <userContext.Consumer>
          {({user}) => user.email ? 
              <>
              <h4>Hello {user.email}</h4>
              <Link className="mx-5 rounded border-2 p-2" to="/login">Logout</Link>
              </>
              :
            <>
              <Link className="mx-5 rounded border-2 p-2" to="/login">Login</Link>
              <Link className="mx-5 rounded border-2 p-2" to="/register">Register</Link>
            </>
          }
          
        </userContext.Consumer>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginComponent/>} />
          <Route path="register" element={<RegisterComponent/>} />
        </Routes>
      </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
