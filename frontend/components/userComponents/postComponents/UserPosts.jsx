/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import PostList from './PostList';

import { getPostsByAuthor, deletePost } from '../../../actions/post';
import { getFavouritedPosts, updateFavouritedPosts } from '../../../actions/user';

//TODO: Change ternary operator for onLike so users cant favourite own posts

const UserFeed = ({ id }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [favouritedPosts, setFavouritedPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getPostsByAuthor(id));
      setFavouritedPosts(await getFavouritedPosts("*"));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

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
    <PostList
      posts={posts}
      loading={loading && posts}
      renderItem={(p) => (
        <PostList.Item
          post={p}
          onLike={user && user._id === p.author._id ? {handleLike} : undefined}
          onDelete={user && user._id === p.author._id ? handleDelete : undefined}
        />
      )}
    />
  );
};

export default UserFeed;
