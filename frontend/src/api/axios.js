import axios from 'axios';

export const axiosClient = axios.create({

    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,

})

axiosClient.interceptors.request.use(
    async (config) => {
        const token = window.localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);