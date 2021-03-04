import api from '../services/api';

const signup = (name, email, password) =>
  api.post('/users/signup', {
    name,
    email,
    password,
  });

export { signup };
