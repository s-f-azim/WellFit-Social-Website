import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const deleteSpecificUser = (userId) => api.delete(`/users/delete/${userId}`);

const getUsers = () => api.get('/users');

const getUsersWithLimit = (limit) => api.get(`/users?limit=${limit}`);

const getAdmins = () => api.get('users?role=admin');

const getClients = () => api.get('users?role=client');

const getInstructors = () => api.get('users?role=instructor');

const getSuggestedInstructors = () => api.get('users/profile');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

const banUser = (user) => api.patch(`/ban/${user._id}`, {});

export {
  updateUser as default,
  deleteUser,
  deleteSpecificUser,
  getUsers,
  getUsersWithLimit,
  getAdmins,
  getClients,
  getInstructors,
  addingFollowUser,
  getSuggestedInstructors,
  banUser,
};
