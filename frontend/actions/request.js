import api from '../services/api';

const createRequest = async (type, content) => {
  const res = await api.post(`/requests/create`, {
    type,
    content,
  });
  return res.data.data.request;
};

const getRequests = async () => {
  const res = await api.get(`/requests`);
  return res.data.data;
};

const deleteRequest = async (id) => {
  console.log('got action');
  api.delete(`/requests/delete/${id}`);
};

export { createRequest, getRequests, deleteRequest };
