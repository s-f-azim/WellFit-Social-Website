import axios from 'axios';
import API from '../config';
import { getCookie } from './auth';

axios.defaults.withCredentials = true;

const updateUser = (values) =>
  axios.patch(
    `${API}/users/editProfile`,
    {
      ...values,
    },
    { headers: { Authorization: `Bearer ${getCookie('token')}` } }
  );

const createReview = (userId, review) =>
  axios.patch(
    `${API}/users/review/${userId}`,
    {
      ...review,
    },
    { headers: { Authorization: `Bearer ${getCookie('token')}` } }
  );

export { updateUser, createReview as default };
