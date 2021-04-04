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

const getPeople = (name, gender, role, tags, pageSize, offset) =>
  api.get('users', {
    params: {
      ...(role.length > 0 && { role }),
      ...(name.length > 0 && { fName: name }),
      ...(name.length > 0 && { lName: name }),
      ...(gender > 0 && { gender }),
      ...(tags.length > 0 && { 'tags[all]': tags.join(',') }),
      limit: pageSize,
      page: offset,
    },
  });

const getInstructors = () => api.get(`users?role=instructor&&limit=${Number.MAX_SAFE_INTEGER}`);

const getSuggestedInstructors = () => api.get('users/suggestedInstructors');

const addingFollowUser = (userId) => api.patch(`/users/follow/${userId}`, {});

const getTrendingUsers = () => api.get('/users/trendingUsers');

const getTrendingUsersLimit = (limit) => api.get(`/users/trendingUsers?limit=${limit}`);

const getFollowingList = (id, limit) =>
  api.get(`/users/getFollowing/${id}${limit ? `?limit=${limit}` : ''}`);

const getFollowerList = (id, pageNum) =>
  api.get(`/users/getFollower/${id}${pageNum ? `?pageNum=${pageNum}` : ''}`);

const banUser = (userId) => api.patch(`/users/ban/${userId}`, {});

const getWishList = () => api.get('/users/wishlist');

const updateWishList = (courseId) => api.patch(`/users/updatewishlist/${courseId}`, {});

export {
  updateUser as default,
  deleteUser,
  deleteSpecificUser,
  getUsers,
  getUsersWithLimit,
  getAdmins,
  getClients,
  getInstructors,
  getPeople,
  addingFollowUser,
  getFollowingList,
  getFollowerList,
  getSuggestedInstructors,
  banUser,
  getUserIdByEmail,
  getTrendingUsers,
  getTrendingUsersLimit,
  getWishList,
  updateWishList,
};
