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

const deleteSpecificUser = (userId) => api.delete(`/users/delete/${userId}`);

const getUsers = () => api.get('/users');

const getUsersWithLimit = (limit) => api.get(`/users?limit=${limit}`);

const getAdmins = () => api.get(`users?role=admin&&limit=${Number.MAX_SAFE_INTEGER}`);

const getClients = () => api.get(`users?role=client&&limit=${Number.MAX_SAFE_INTEGER}`);

const getInstructorsFiltered = (q, gender, age, tags, pageSize, offset) =>
  /* api.get(`/users/role=instructors&&name=${q}&&gender=${gender}&&age=${age}&&tags[in]=${tags.join(',')}`) */
  api.get(
    `/users/instructors?q=${q}&&gender=${gender}&&pageSize=${pageSize}&&offset=${offset}&&age=${age}&&tags=${tags.join(
      ','
    )}`
  );

const getInstructors = () => api.get(`users?role=instructor&&limit=${Number.MAX_SAFE_INTEGER}`);

const getSuggestedInstructors = () => api.get('users/profile');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

const getTrendingUsers = () => api.get('/users/trendingUsers');

const getFollowingList = () => api.get('/users/getFollowing');

const getFollowerList = (pageNum) => api.get(`/users/getFollower/?page=${pageNum}`);

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
  getInstructorsFiltered,
  addingFollowUser,
  getFollowingList,
  getFollowerList,
  getSuggestedInstructors,
  banUser,
  getUserIdByEmail,
  getTrendingUsers,
};
