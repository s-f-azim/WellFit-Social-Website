/* eslint-disable no-underscore-dangle */
import api from '../services/api';

const createCourse = async (values) => {
  const res = await api.post('/courses/create', {
    ...values,
  });
  const course = res.data.data;
  const formData = new FormData();
  formData.append('images', values.photo.originFileObj);
  await api.post(`/courses/${course._id}/images`, formData);

  return res.data;
};

const deleteCourse = async (id) => {
  await api.delete(`/courses/delete/${id}`);
};

const getCourses = (title, tags, etags, pageSize, offset) =>
  api.get('courses', {
    params: {
      ...(title.length > 0 && { title }),
      ...(tags.length > 0 && { 'tags[all]': tags.join(',') }),
      ...(etags.length > 0 && { 'trainingEquipment[all]': etags.join(',') }),
      limit: pageSize,
      page: offset,
    },
  });

const getCourseCreators = (courseId) => api.get(`/courses/${courseId}/creators`);

const uploadImages = (id, images) => api.post(`/courses/${id}/images`, images);

export { createCourse as default, deleteCourse, getCourses, getCourseCreators };
