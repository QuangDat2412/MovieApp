import axios from 'axios';

const BASE_URL = process.env.REACT_APP_LINK;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
});
userRequest.interceptors.request.use((config) => {
    const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.currentUser?.accessToken;
    if (TOKEN) {
        config.headers.token = `Bearer ${TOKEN}`;
    }
    return config;
});
