/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Card } from 'antd';
import PostInput from './PostInput';
import PostList from './PostList';

import { createPost, getPostsByAuthor, getFeedPosts, deletePost } from '../actions/post';

const UserFeed = ({ id }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    setPosts(await getFeedPosts());
    // setPosts(await getPostsByAuthor(id));
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
      <PostInput onSubmit={handleSubmit} />
      <PostList
        posts={posts}
        loading={loading && posts}
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
