import api from '../services/api';

const updateUser = (values) =>
    api.patch('/users/editProfile', {
        ...values,
    });

export { updateUser as default };
