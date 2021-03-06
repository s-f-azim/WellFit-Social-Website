import axios from 'axios';
import API from '../config';
import { getCookie } from './auth';

axios.defaults.withCredentials = true;

const createReview = (reviewedId, review) =>
  axios.post(
    `${API}/users/${reviewedId}/reviews`,
    {
      ...review,
    },
    { headers: { Authorization: `Bearer ${getCookie('token')}` } }
  );

const getReviews = async (reviewedId) => {
  const res = await axios.get(`${API}/users/${reviewedId}/reviews`);
  return res.data.data.reviews;
};

const deleteReview = async (reviewedId) => {
  await axios.delete(
    `${API}/users/${reviewedId}/reviews`,
    {},
    {
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    }
  );
};

export { createReview, getReviews, deleteReview };
