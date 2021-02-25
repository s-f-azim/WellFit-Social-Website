import API from "../config";
import axios from "axios";
import cookie from "js-cookie";

const signup = (name, email, password) => {
  return axios.post(`${API}/users/signup`, {
    name: name,
    email: email,
    password: password,
  });
};

// login a user
const signin = (email, password) => {
  return axios.post(`${API}/users/login`, {
    email: email,
    password: password,
  });
};
// logout the user
const logout = () => {
  removeCookie("token");
  removeCookie("user");
  return axios.get(`${API}/users/logout`);
};

// authenticate user by setting the cookie
const authenticate = (data, next) => {
  setCookie("token", data.token);
  setCookie("user", data.data);
  next();
};

// Set the cookie
const setCookie = (key, value) =>
  process.browser ? cookie.set(key, value, { expires: 1 }) : "";

// remove the cookie
const removeCookie = (key) =>
  process.browser ? cookie.remove(key, { expires: 1 }) : "";

// Get the cookie
const getCookie = (key) => {
  if (process.browser) return cookie.get(key);
};

export {
  signup,
  signin,
  logout,
  setCookie,
  getCookie,
  authenticate,
};
