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

export { updateUser, deleteUser, getUserIdByEmail };
