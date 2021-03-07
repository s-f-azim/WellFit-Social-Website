import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const getUsers = () => api.get('/users');

export { updateUser as default, deleteUser, getUsers };
