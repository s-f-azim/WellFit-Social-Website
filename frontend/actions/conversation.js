import api from '../services/api';
const createConversation = (userIds) => api.post('/conversation', { users: [usersIds] });

const getConversation = (id) => api.get(`/conversation/${id}`);

export { createConversation, getConversation };
