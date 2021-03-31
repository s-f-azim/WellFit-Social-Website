import api from '../services/api';

const createCourse = async (values) => {
  const res = await api.post('/courses/create', {
    ...values,
  });
  return res.data;
};

const getCourses = (title, tags, etags, pageSize, offset) =>
  api.get('courses', {
    params: {
      ...(title.length > 0 && { title }),
      ...(tags.length > 0 && { 'tags[in]': tags.join(',') }),
      ...(etags.length > 0 && { 'trainingEquipment[in]': etags.join(',') }),
      limit: pageSize,
      page: offset,
    },
  });

const getCourseCreators = (courseId) => api.get(`/courses/${courseId}/creators`);

export { createCourse as default, getCourses, getCourseCreators };
