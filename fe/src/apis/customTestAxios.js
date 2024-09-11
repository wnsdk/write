import axios from 'axios';

const customTestAxios = axios.create({
    baseURL: 'https://koreanjson.com/',
});

export { customTestAxios };
