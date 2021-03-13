import api from '../services/api';

const updateUser = (values) =>
  api.patch('/users/editProfile', {
    ...values,
  });

const deleteUser = () => api.delete('/users/delete');

const getSuggestedInstructors = () => api.get('users/profile');

const getInstructors = (q, gender, age, tags) =>
  api.get(`/users/instructors?q=${q}&&gender=${gender}&&age=${age}&&tags=${tags.join(',')}`);

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

export {
  updateUser as default,
  deleteUser,
  addingFollowUser,
  getSuggestedInstructors,
  getInstructors,
};
