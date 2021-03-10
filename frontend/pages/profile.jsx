import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Button, Row, Col } from 'antd';
import WishList from '../components/WishList';
import ReactDOM from 'react-dom';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  function resetButtons() {
    ReactDOM.render(
      <Button
        id="favourites"
        type="link"
        size="large"
        onClick={displayFavourites}
        className="button"
      >
        Favourites
      </Button>,
      document.getElementById('favourites')
    );

    ReactDOM.render(
      <Button id="following" type="link" size="large" onClick={displayFollowing} className="button">
        Following
      </Button>,
      document.getElementById('following')
    );

    ReactDOM.render(
      <Button id="wishlist" type="link" size="large" onClick={displayWishList} className="button">
        Wish List
      </Button>,
      document.getElementById('wishlist')
    );
  }

  function displayFavourites() {
    resetButtons();
    ReactDOM.render(
      <Button
        id="favourites"
        type="link"
        size="large"
        onClick={displayFavourites}
        className="clicked-button"
      >
        Favourites
      </Button>,
      document.getElementById('favourites')
    );
    ReactDOM.render(<p>Favourites</p>, document.getElementById('content'));
  }

  function displayFollowing() {
    resetButtons();
    ReactDOM.render(
      <Button
        id="following"
        type="link"
        size="large"
        onClick={displayFollowing}
        className="clicked-button"
      >
        Following
      </Button>,
      document.getElementById('following')
    );
    ReactDOM.render(<p>Following</p>, document.getElementById('content'));
  }

  function displayWishList() {
    resetButtons();
    ReactDOM.render(
      <Button
        id="wishlist"
        type="link"
        size="large"
        onClick={displayWishList}
        className="clicked-button"
      >
        Wish List
      </Button>,
      document.getElementById('wishlist')
    );
    ReactDOM.render(<WishList user={user} />, document.getElementById('content'));
  }

  return (
    <Row type="flex" justify="center" align="middle">
      <div style={{ width: '80rem' }}>
        <Row type="flex" justify="center" align="middle" className="profile-tabs">
          <Col type="flex" justify="center" align="middle" className="tab">
            <Button
              id="favourites"
              type="link"
              size="large"
              onClick={displayFavourites}
              className="button"
            >
              Favourites
            </Button>
          </Col>
          <Col style={{ width: '2rem' }}></Col>
          <Col type="flex" justify="center" align="middle" className="tab">
            <Button
              id="following"
              type="link"
              size="large"
              onClick={displayFollowing}
              className="button"
            >
              Following
            </Button>
          </Col>
          <Col style={{ width: '2rem' }}></Col>
          <Col type="flex" justify="center" align="middle" className="tab">
            <Button
              id="wishlist"
              type="link"
              size="large"
              onClick={displayWishList}
              className="button"
            >
              Wish List
            </Button>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row type="flex" justify="center" align="middle">
          <div id="content"></div>
        </Row>
      </div>
    </Row>
  );
};

export default Profile;
