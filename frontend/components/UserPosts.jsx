/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import PostList from './PostList';

import { getPostsByAuthor, deletePost } from '../actions/post';

const UserFeed = ({ id }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getPostsByAuthor(id));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  const handleLike = (postId) => {
    // likePost()
  };

  const handleDelete = (postId) => {
    deletePost(postId);
    setPosts(posts.filter((p) => p._id !== postId));
  };

  return (
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
  );
};

export default UserFeed;
