import api from '../services/api';

const updateUser = (values) =>
    api.patch('/users/editProfile', {
        ...values,
    });

const deleteUser = () =>
    api.delete('/users/delete');

const addingFollowUser = (userId) =>
  axios.patch(
    `${API}/users/follow/${userId}`,
    {

    },
    { headers: { Authorization: `Bearer ${getCookie("token")}` } }
  )
export { updateUser as default, deleteUser, addingFollowUser };
