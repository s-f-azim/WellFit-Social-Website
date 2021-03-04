import api from '../services/api';

const signup = (name, email, password) =>
  api.post(`${API}/users/signup`, {
    name,
    email,
    password,
  });

export { signup };
