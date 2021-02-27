import axios from 'axios';
import cookie from 'js-cookie';
import API from '../config';

// Set the cookie
const setCookie = (key, value) => (process.browser ? cookie.set(key, value, { expires: 1 }) : '');

// remove the cookie
const removeCookie = (key) => (process.browser ? cookie.remove(key, { expires: 1 }) : '');

const signup = (name, email, password) => axios.post(`${API}/users/signup`, {
  name,
  email,
  password,
});
// login a user
const signin = (email, password) => axios.post(`${API}/users/login`, {
  email,
  password,
});
// logout the user
const logout = () => {
  removeCookie('token');
  removeCookie('user');
  return axios.get(`${API}/users/logout`);
};

// authenticate user by setting the cookie
const authenticate = (data, next) => {
  setCookie('token', data.token);
  setCookie('user', data.data);
  next();
};

// Get the cookie
const getCookie = (key) => (process.browser ? cookie.get(key) : '');

export {
  signup,
  signin,
  logout,
  setCookie,
  getCookie,
  authenticate,
};
