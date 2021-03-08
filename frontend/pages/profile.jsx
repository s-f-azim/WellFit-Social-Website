import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row } from 'antd';
import WishList from '../components/WishList';
import ReactDOM from 'react-dom';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  function displayFavourites() {
    ReactDOM.render(<p>Favourites</p>, document.getElementById('content'));
  }

  function displayFollowing() {
    ReactDOM.render(<p>Following</p>, document.getElementById('content'));
  }

  function displayWishList() {
    ReactDOM.render(<WishList />, document.getElementById('content'));
  }

  function displaySuggestions() {
    ReactDOM.render(<p>Suggestions</p>, document.getElementById('content'));
  }

  return (
    <div>
      <Row type="flex" justify="center" align="middle">
        <Space direction="horizontal" size="large" className="menu">
          <Button type="link" size="large" onClick={displayFavourites}>
            Favourites
          </Button>
          <Button type="link" size="large" onClick={displayFollowing}>
            Following
          </Button>
          <Button type="link" size="large" onClick={displayWishList}>
            Wish List
          </Button>
          <Button type="link" size="large" onClick={displaySuggestions}>
            Suggestions
          </Button>
        </Space>
      </Row>
      <br />
      <br />
      <br />
      <Row type="flex" justify="center" align="middle">
        <div id="content"></div>
        <WishList />
      </Row>
    </div>
  );
};

export default Profile;
