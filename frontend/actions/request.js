import api from '../services/api';

const createRequest = async (type, content) => {
  const res = await api.post(`/requests/create`, {
    type,
    content,
  });
  return res.data.data.request;
};

const createReport = async (type, content, recipientID) => {
  console.log(`RÜTÜTÜÜTÜTTÜÜ: ${recipientID}`);
  const res = await api.post(`/requests/create`, {
    type,
    content,
    recipientID,
  });
  return res.data.data.request;
};

const getRequests = async () => {
  const res = await api.get(`/requests`);
  return res.data.data;
};

const deleteRequest = async (id) => {
  api.delete(`/requests/delete/${id}`);
};

export { createRequest, createReport, getRequests, deleteRequest };
