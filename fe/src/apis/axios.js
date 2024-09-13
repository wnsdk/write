import axios from 'axios';

export const $ = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
