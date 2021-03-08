import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const addToWishList = (courseId) => api.patch(`/users/addToWishList/:${courseId}`, {});
const removeFromWishList = (courseId) => api.patch(`/users/removeFromWishList/${courseId}`, {});

export { updateUser as default, deleteUser, addToWishList, removeFromWishList };
