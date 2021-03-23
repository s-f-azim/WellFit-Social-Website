import api from '../services/api';

const createCourse = async (values) => {
  const res = await api.post('/courses/create', {
    ...values,
  });
  return res.data;
};

const getCourses = (title, tags, etags) =>
  api.get(`courses?title=${title}&&tags=${tags.join(',')}&&equipment=${etags.join(',')}`);

export { createCourse as default, getCourses };
