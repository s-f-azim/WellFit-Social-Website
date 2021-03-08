import axios from 'axios';
import API from '../config';
import { getCookie } from './auth';

axios.defaults.withCredentials = true;

const createReview = async (reviewedId, review) => {
  const res = await axios.post(
    `${API}/users/${reviewedId}/reviews`,
    {
      ...review,
    },
    { headers: { Authorization: `Bearer ${getCookie('token')}` } }
  );
  return res.data.data.review;
};

const getReviews = async (reviewedId) => {
  const res = await axios.get(`${API}/users/${reviewedId}/reviews`);
  return res.data.data.reviews;
};

const deleteReview = async (reviewedId) => {
  axios.delete(
    `${API}/users/${reviewedId}/reviews`,
    {},
    {
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    }
  );
};

export { createReview, getReviews, deleteReview };
