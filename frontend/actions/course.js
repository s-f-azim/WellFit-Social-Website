import api from '../services/api';

const createCourse = async (values) => {
  const res = await api.post('/courses/create', {
    ...values,
  });
  return res.data;
};

const getCourses = (title, tags, etags, pageSize, offset) =>
  api.get(
    `courses/filtered?title=${title}&&tags=${tags.join(
      ','
    )}&&pageSize=${pageSize}&&offset=${offset}&&equipment=${etags.join(',')}`
  );

export { createCourse as default, getCourses };
