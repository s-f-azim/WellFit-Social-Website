import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const getUserIdByEmail = async (email) => {
  const res = await api.get(`/users/email/${email}`);
  return res.data.data;
};

const deleteUser = () => api.delete('/users/delete');

const getUsers = () => api.get('/users');

const getAdmins = () => api.get('users?role=admin');

const getClients = () => api.get('users?role=client');

const getInstructors = () => api.get('users?role=instructor');

const getSuggestedInstructors = () => api.get('users/profile');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

const getTrendingUsers = () => api.get('/users/trendingUsers');

export {
  updateUser as default,
  deleteUser,
  getUsers,
  getAdmins,
  getClients,
  getInstructors,
  addingFollowUser,
  getSuggestedInstructors,
  getUserIdByEmail,
  getTrendingUsers,
};
