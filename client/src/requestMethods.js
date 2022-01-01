import axios from 'axios';

const BASE_URL = 'http://localhost:2412/api/';
const TOKEN = JSON.parse(localStorage.getItem('persist:root'))
    ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.currentUser?.accessToken
    : '';
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});
