/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Card } from 'antd';
import PostInput from './PostInput';
import PostList from './PostList';

import { createPost, getPostsByAuthor, deletePost } from '../actions/post';

const UserFeed = ({ id, showInput, loading }) => {
  const [session] = useSession();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(async () => {
    setPosts(await getPostsByAuthor(id));
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  const handleSubmit = async (values) => {
    const response = await createPost(values);
    setPosts([response.data.data, ...posts]);
  };

  const handleDelete = (postId) => {
    deletePost(postId);
    setPosts(posts.filter((p) => p._id !== postId));
  };

  return (
    <Card>
      {showInput && <PostInput onSubmit={handleSubmit} />}
      <PostList
        posts={posts}
        loading={loading}
        renderItem={(p) => (
          <PostList.Item
            post={p}
            onDelete={user && user._id === p.author._id ? handleDelete : undefined}
          />
        )}
      />
    </Card>
  );
};

export default UserFeed;
