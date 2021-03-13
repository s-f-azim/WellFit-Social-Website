import api from '../services/api';

const createCourse = async (values) => {
  const res = await api.post('/courses/create', {
    ...values,
  });
  return res.data.data;
};

export { createCourse as default };
