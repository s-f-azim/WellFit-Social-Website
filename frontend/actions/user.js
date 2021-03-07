import api from '../services/api';

const updateUser = (values) =>
    api.patch('/users/editProfile', {
        ...values,
    });

const deleteUser = () => 
    api.delete('/users/delete');

const getSuggestedInstructors = () =>
    api.get('users/profile');

export { updateUser as default, deleteUser, getSuggestedInstructors };
