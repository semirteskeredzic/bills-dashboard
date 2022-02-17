import axios from 'axios'

const getCurrentUser = () => {
    return localStorage.getItem('user')
}

const logout = () => {
    localStorage.removeItem('user')
    return axios.post(`${process.env.REACT_APP_API_URL}/logout`).then(response => {return response.data})
}

const AuthService = {
    getCurrentUser,
    logout
}

export default AuthService