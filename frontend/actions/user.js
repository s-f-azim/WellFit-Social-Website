import api from '../services/api';

const updateUser = (values) =>
    api.patch('/users/editProfile', {
        ...values,
    });

const deleteUser = () => 
    api.delete('/users/delete');

export { updateUser as default, deleteUser };
