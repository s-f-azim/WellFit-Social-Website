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

  function displayFavourites() {
    ReactDOM.render(<p>Favourites</p>, document.getElementById('content'));
  }

  function displayFollowing() {
    ReactDOM.render(<p>Following</p>, document.getElementById('content'));
  }

  function displayWishList() {
    ReactDOM.render(<WishList />, document.getElementById('content'));
  }

  return (
    <Row type="flex" justify="center" align="middle">
      <div style={{ width: '80rem' }}>
        <Row type="flex" justify="center" align="middle" className="menu">
          <Col type="flex" justify="center" align="middle" style={{ width: '25rem' }}>
            <Button type="link" size="large" onClick={displayFavourites}>
              <h1>Favourites</h1>
            </Button>
          </Col>
          <Col style={{ width: '2rem' }}></Col>
          <Col type="flex" justify="center" align="middle" style={{ width: '25rem' }}>
            <Button type="link" size="large" onClick={displayFollowing}>
              <h1>Following</h1>
            </Button>
          </Col>
          <Col style={{ width: '2rem' }}></Col>
          <Col type="flex" justify="center" align="middle" style={{ width: '25rem' }}>
            <Button type="link" size="large" onClick={displayWishList}>
              <h1>Wish List</h1>
            </Button>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row type="flex" justify="center" align="middle">
          <div id="content"></div>
          <WishList />
        </Row>
      </div>
    </Row>
  );
};

export default Profile;
