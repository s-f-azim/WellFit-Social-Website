import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Button, Row, Col, Space } from 'antd';
import WishList from '../components/WishList';
import ReactDOM from 'react-dom';
import api from '../services/api';
import Suggestions from '../components/SuggestedInstructors';
import Image from 'next/image';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  let courses;

  // redirect to home page if user not logged in
  useEffect(async () => {
    if (!user) {
      router.push('/');
    } else {
      const response = await api.get('/users/wishlist');
      courses = response.data.data;
    }
  }, []);

  function resetButtons() {
    ReactDOM.render(
      <Button type="link" size="large" onClick={displayFavourites} className="button">
        Favourites
      </Button>,
      document.getElementById('favourites')
    );

    ReactDOM.render(
      <Button type="link" size="large" onClick={displayFollowing} className="button">
        Following
      </Button>,
      document.getElementById('following')
    );

    ReactDOM.render(
      <Button type="link" size="large" onClick={displayWishList} className="button">
        Wish List
      </Button>,
      document.getElementById('wishlist')
    );
  }

  function displayFavourites() {
    resetButtons();
    ReactDOM.render(
      <Button type="link" size="large" onClick={displayFavourites} className="clicked-button">
        Favourites
      </Button>,
      document.getElementById('favourites')
    );
    ReactDOM.render(<p>Favourites</p>, document.getElementById('content'));
  }

  function displayFollowing() {
    resetButtons();
    ReactDOM.render(
      <Button type="link" size="large" onClick={displayFollowing} className="clicked-button">
        Following
      </Button>,
      document.getElementById('following')
    );
    ReactDOM.render(<p>Following</p>, document.getElementById('content'));
  }

  function displayWishList() {
    resetButtons();
    ReactDOM.render(
      <Button type="link" size="large" onClick={displayWishList} className="clicked-button">
        Wish List
      </Button>,
      document.getElementById('wishlist')
    );
    ReactDOM.render(<WishList courses={courses} />, document.getElementById('content'));
  }

  return (
    <>
      <Row type="flex" justify="center" align="middle">
        <div style={{ width: '83rem' }}>
          <Row type="flex" justify="center">
            <Col>
              <Image
                src={
                  user.photos[0]
                    ? `data:image/png;base64,${Buffer.from(content.photos[0].data).toString(
                        'base64'
                      )}`
                    : '/image-not-found.svg'
                }
                width={100}
                height={100}
              />
            </Col>
            <Col span={1}></Col>
            <Col className="profile-info">
              <p>
                <h2>{user.name}</h2>
              </p>
              <Space direction="horizontal" size="large">
                <p>Followers: 37</p>
                <p>Following: {user.following.length}</p>
              </Space>
              <p>{user.bio ? user.bio : <></>}</p>
            </Col>
          </Row>
        </div>
      </Row>
      <Row type="flex" justify="center">
        <Suggestions />
      </Row>

      <Row>
        <Col style={{ minHeight: '5rem' }}></Col>
      </Row>
      <Row type="flex" justify="center" align="middle">
        <div style={{ width: '83rem' }}>
          <Row type="flex" justify="center" align="middle" className="profile-tabs">
            <Col id="favourites" type="flex" justify="center" align="middle" className="tab">
              <Button type="link" size="large" onClick={displayFavourites} className="button">
                Favourites
              </Button>
            </Col>
            <Col style={{ width: '2rem' }}></Col>
            <Col id="following" type="flex" justify="center" align="middle" className="tab">
              <Button type="link" size="large" onClick={displayFollowing} className="button">
                Following
              </Button>
            </Col>
            <Col style={{ width: '2rem' }}></Col>
            <Col id="wishlist" type="flex" justify="center" align="middle" className="tab">
              <Button type="link" size="large" onClick={displayWishList} className="button">
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
    </>
  );
};

export default Profile;
