import Router, { useRouter } from 'next/router';
import api from './api';

export const login = async (email, password) => {
  const response = await api.post('users/login', { email, password });
  if (response.data.token) {
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  }
  return response;
};

export const logout = async () => {
  delete api.defaults.headers.Authorization;
  try {
    await api.get('users/logout');
  } catch (err) {
    return;
  }
  Router.push('/');
};
export const signup = async (role, email, fName, lName, password, address = '') =>
  await api.post('/users/signup', {
    role,
    email,
    fName,
    lName,
    password,
    address,
  });
