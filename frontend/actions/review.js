import api from '../services/api';

const createReview = async (reviewedId, review) => {
  const res = await api.post(`/users/${reviewedId}/reviews`, {
    ...review,
  });
  return res.data.data.review;
};

const getReviews = async (reviewedId) => {
  const res = await api.get(`/users/${reviewedId}/reviews`);
  return res.data.data.reviews;
};

const deleteReview = async (reviewedId) => {
  api.delete(`/users/${reviewedId}/reviews`);
};

export { createReview, getReviews, deleteReview };
