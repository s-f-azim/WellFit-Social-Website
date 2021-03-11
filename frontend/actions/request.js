import api from '../services/api';

const createRequest = async (author, type, content) => {
  const res = await api.post(`/requests`, {
    author,
    type,
    content,
  });
  return res.data.data.request;
};

export { createRequest };
