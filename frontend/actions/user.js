import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const deleteSpecificUser = (userId) => api.delete(`/users/delete/${userId}`);

const getUsers = () => api.get('/users');

const getUsersWithLimit = (limit) => api.get(`/users?limit=${limit}`);

const getAdmins = () => api.get(`users?role=admin&&limit=${Number.MAX_SAFE_INTEGER}`);

const getClients = () => api.get(`users?role=client&&limit=${Number.MAX_SAFE_INTEGER}`);

const getInstructors = () => api.get(`users?role=instructor&&limit=${Number.MAX_SAFE_INTEGER}`);

const getSuggestedInstructors = () => api.get('users/profile');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

const banUser = (userId) => api.patch(`/users/ban/${userId}`, {});

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
