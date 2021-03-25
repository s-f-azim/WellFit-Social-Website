/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Divider } from 'antd';
import PostInput from './PostInput';
import PostList from './PostList';

import { createPost, getFeedPosts, deletePost } from '../actions/post';

const UserFeed = () => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getFeedPosts());
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  const handleSubmit = async (values) => {
    const response = await createPost(values);
    setPosts([response.data.data, ...posts]);
  };

  const handleLike = (postId) => {
    // likePost()
  };

  const handleDelete = (postId) => {
    deletePost(postId);
    setPosts(posts.filter((p) => p._id !== postId));
  };

  return (
    <>
      <PostInput onSubmit={handleSubmit} />
      <Divider dashed />
      <PostList
        posts={posts}
        loading={loading && posts}
        renderItem={(p) => (
          <PostList.Item
            post={p}
            onLike={user && user._id === p.author._id ? handleLike : undefined}
            onDelete={user && user._id === p.author._id ? handleDelete : undefined}
          />
        )}
      />
    </>
  );
};

export default UserFeed;
