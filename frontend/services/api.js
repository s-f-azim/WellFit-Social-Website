import axios from 'axios';
import API from '../config';

// create the basic config of axios such as url and credentials
const api = axios.create({ baseURL: 'https://api-wellfit.herokuapp.com/api' });
api.defaults.withCredentials = true;

export default api;
