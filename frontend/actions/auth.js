import api from '../services/api';

const signup = (name, email, password) =>
  api.post(`${API}/users/signup`, {
    name,
    email,
    password,
  });
// login a user
const signin = (email, password) =>
  api.post('users/login', {
    email,
    password,
  });
// logout the user
const logout = () => {
  removeCookie('token');
  removeCookie('user');
  return axios.get('${API}/users/logout');
};

export { signup, signin, logout };
