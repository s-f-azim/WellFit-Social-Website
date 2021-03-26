import api from '../services/api';

const createPost = async (values) => {
  const res = await api.post('/posts', { ...values });
  return res.data.data;
};

const getPostsByAuthor = async (id) => {
  const res = await api.get(`/posts/author/${id}`);
  return res.data.data;
};

const getFeedPosts = async () => {
  const res = await api.get(`/posts/feed`);
  return res.data.data;
};

const deletePost = async (id) => api.delete(`/posts/${id}`);

export { createPost, getPostsByAuthor, getFeedPosts, deletePost };
