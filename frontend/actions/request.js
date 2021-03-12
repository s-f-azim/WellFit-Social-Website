import api from '../services/api';

const createRequest = async (type, content) => {
  //fix here, pass a review id somewhere...
  const res = await api.post(`/requests/create`, {
    type,
    content,
  });
  return res.data.data.request;
};

export { createRequest };
