import api from '../services/api';

const createRequest = async (type, content) => {
  const res = await api.post(`/requests/create`, {
    type,
    content,
  });
  return res.data.data.request;
};

const createReport = async (type, content, recipientID) => {
  const res = await api.post(`/requests/create`, {
    type: type,
    content: content,
    recipientID: recipientID,
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

const acceptVerify = async (id) => {
  api.patch(`/requests/verify/${id}`);
};

export { createRequest, createReport, getRequests, deleteRequest, acceptVerify };
