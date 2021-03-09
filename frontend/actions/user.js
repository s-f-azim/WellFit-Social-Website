import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const getSuggestedInstructors = () => api.get('users/profile');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

export { updateUser as default, deleteUser, 
  addingFollowUser, getSuggestedInstructors };
