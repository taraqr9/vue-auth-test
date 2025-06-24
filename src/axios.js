import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/json',
    },
})

export default instance
