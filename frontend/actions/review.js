import api from '../services/api';

const createUserReview = async (id, review) => {
  api.post(`/users/${id}/reviews`, {
    ...review,
  });
};

const getUserReviews = async (id) => {
  const res = await api.get(`/users/${id}/reviews`);
  return res.data.data;
};

const deleteUserReview = async (id) => api.delete(`/users/${id}/reviews`);

const createCourseReview = async (id, review) =>
  api.post(`/courses/${id}/reviews`, {
    ...review,
  });

const getCourseReviews = async (id) => {
  const res = await api.get(`/courses/${id}/reviews`);
  return res.data.data;
};

const deleteCourseReview = async (id) => api.delete(`/courses/${id}/reviews`);

export {
  createUserReview,
  getUserReviews,
  deleteUserReview,
  createCourseReview,
  getCourseReviews,
  deleteCourseReview,
};
