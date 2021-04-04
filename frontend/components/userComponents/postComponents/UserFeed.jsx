/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Divider } from 'antd';
import PostInput from './PostInput';
import PostList from './PostList';

import { createPost, getFeedPosts, deletePost } from '../../../actions/post';
import { updateFavouritedPosts } from '../../../actions/user';


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
    const post = await createPost(values);
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    try {
      updateFavouritedPosts(postId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (postId) => {
    try {
      deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PostInput onSubmit={handleSubmit} />
      <Divider />
      <PostList
        posts={posts}
        loading={loading && posts}
        renderItem={(p) => (
          <PostList.Item
            post={p}
            onLike={user && user._id !== p.author._id ? handleLike : undefined}
            onDelete={user && user._id === p.author._id ? handleDelete : undefined}
          />
        )}
      />
    </>
  );
};

export default UserFeed;
