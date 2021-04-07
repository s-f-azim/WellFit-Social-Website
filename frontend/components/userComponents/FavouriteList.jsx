import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import { useSession } from 'next-auth/client';
import { getFavouritedPosts, updateFavouritedPosts } from '../../actions/user';
import PostList from './postComponents/PostList';

const Favourites = () => {
  const [session, loading] = useSession();
  const [posts] = useState([]);
  const [user, setUser] = useState();
  const [favouritedPosts, setFavouritedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loadQuantity = 10;

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  const fetchMorePosts = async () => {
    const fetchedPosts = (await getFavouritedPosts(posts.length + loadQuantity)).data.data;
    if (favouritedPosts.length !== fetchedPosts.length) {
      // if more posts have been fetched
      setFavouritedPosts(fetchedPosts);
    } else {
      setHasMore(false);
    }
  };

  const handleLike = (postId) => {
    try {
      updateFavouritedPosts(postId);
      setFavouritedPosts(favouritedPosts.filter((p) => p._id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsLiked = (postId) => {
    // show post has been liked already by setting isLiked prop
    let isLiked = false;
    for (let i = 0; i < favouritedPosts.length; i++) {
      // check favouritedPosts
      if (favouritedPosts[i]._id === postId) {
        isLiked = true;
        break;
      }
    }
    return isLiked;
  };

  return (
    <div style={{ overflow: 'auto', height: 'auto', width: 535, maxHeight: 700 }}>
      <InfiniteScroll
        loadMore={fetchMorePosts}
        hasMore={hasMore}
        useWindow={false}
        loader={
          <div style={{ textAlign: 'center' }}>
            <LoadingOutlined />
          </div>
        }
      >
        <PostList
          posts={favouritedPosts}
          loading={loading && favouritedPosts}
          renderItem={(p) => (
            <PostList.Item
              post={p}
              onLike={user && user._id !== p.author._id ? handleLike : undefined}
              isLiked={handleIsLiked(p._id)}
            />
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default Favourites;
