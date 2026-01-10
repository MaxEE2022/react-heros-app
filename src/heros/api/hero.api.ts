
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const HerosAPI = axios.create({
    baseURL: `${BASE_URL}/api/heroes`
});