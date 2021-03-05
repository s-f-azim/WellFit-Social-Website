import axios from 'axios';
import API from '../config';

const api = axios.create({ baseURL: API });
api.defaults.withCredentials = true;

export default api;
