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
      setFavouritedPosts(await (await getFavouritedPosts("*")).data.data);
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
      if (favouritedPosts.some(p => p._id === postId)) { //if already liked
        setFavouritedPosts(favouritedPosts.filter((p) => p._id !== postId)) //remove from liked        
      } else {
        const likedPost = posts.filter((p) => p._id === postId)[0]; //extract liked post as object
        setFavouritedPosts(favouritedPosts.concat([likedPost])); //add liked post
      }
      
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

  const handleIsLiked = (postId) => { //show post has been liked already by setting isLiked prop
    let isLiked = false;
    for (let i = 0; i < favouritedPosts.length; i++) { //check favouritedPosts
      if (favouritedPosts[i]._id === postId) { 
        isLiked = true;
        break; 
      }
    }
    return isLiked;
  };

  return (
    <PostList
      posts={posts}
      loading={loading && posts}
      renderItem={(p) => (
        <PostList.Item
          post={p}
          onLike={user && user._id === p.author._id ? handleLike : undefined}
          isLiked={handleIsLiked(p._id)}
          onDelete={user && user._id === p.author._id ? handleDelete : undefined}
        />
      )}
    />
  );
};

export default UserFeed;
