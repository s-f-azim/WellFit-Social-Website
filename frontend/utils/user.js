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
  axios.post(
    `${API}/users/reviews/${userId}`,
    {
      ...review,
    },
    { headers: { Authorization: `Bearer ${getCookie('token')}` } }
  );

const getReviews = async (userId) => {
  const res = await axios.get(`${API}/users/reviews/${userId}`);
  console.log(res.data.data.reviews);
  return res.data.data.reviews;
};

export { updateUser, createReview, getReviews };
