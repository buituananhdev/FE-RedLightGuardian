import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', 
    timeout: 10000, 
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Retrieve the authorization token from wherever you store it
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

class Api {
    constructor() {
        this.axiosInstance = axiosInstance;
    }

    Login = (data) => {
        return axiosInstance.post('/auth/login', {
            username: data.username,
            password: data.password
        })
    }

    GetListUsers = () => {
        return axiosInstance.get('/users');
    }

    DeleteUser = (id) => {
        return axiosInstance.delete(`/user/${id}`)
    }
}

export const api = new Api();