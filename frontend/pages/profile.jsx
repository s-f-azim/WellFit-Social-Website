import { Space, Button, Row, Col } from 'antd';
import { useSession, getSession } from 'next-auth/client';
import Suggestions from '../components/SuggestedInstructors';
import WishList from '../components/WishList';
import ReactDOM from 'react-dom';
import Image from 'next/image';

const Profile = () => {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  /**
   * Change the appearance of each button to its original appearance.
   */
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

  /**
   * Reset each button to its original state and then change the "Favourites" button to make it
   * clear that it is the one currently selected. Also, load the user's favourites into the
   * div with id 'content'.
   */
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
    ReactDOM.render(<WishList />, document.getElementById('content'));
  }

  if (session) {
    return (
      <>
        <Row type="flex" justify="center" align="middle" style={{ marginTop: '5%' }}>
          <div style={{ width: '83rem' }}>
            <Row type="flex" justify="center">
              <Col>
                <Image
                  src={
                    session.user.photos[0]
                      ? `data:image/png;base64,${Buffer.from(content.photos[0].data).toString(
                          'base64'
                        )}`
                      : '/image-not-found.svg'
                  }
                  width={300}
                  height={300}
                />
              </Col>
              <Col span={1}></Col>
              <Col className="profile-info">
                <p style={{ fontSize: '3rem' }}>{session.user.name}</p>
                <Space direction="horizontal" size="large" style={{ fontSize: '1.5rem' }}>
                  <p>Followers: 37</p>
                  <p>Following: {session.user.following.length}</p>
                </Space>
                <p style={{ fontSize: '1.5rem' }}>{session.user.bio ? session.user.bio : <></>}</p>
              </Col>
            </Row>
          </div>
        </Row>

        <Row>
          <Col style={{ minHeight: '3rem' }}></Col>
        </Row>

        <Row type="flex" justify="center">
          <Suggestions />
        </Row>

        <Row>
          <Col style={{ minHeight: '3rem' }}></Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <div style={{ width: '83rem' }}>
            <Row type="flex" justify="center" align="middle" className="profile-tabs">
              <Col id="favourites" type="flex" justify="center" align="middle" className="tab">
                <Button type="link" size="large" onClick={displayFavourites} className="button">
                  Favourites
                </Button>
              </Col>
              <Col id="following" type="flex" justify="center" align="middle" className="tab">
                <Button type="link" size="large" onClick={displayFollowing} className="button">
                  Following
                </Button>
              </Col>
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
              <div id="content" style={{ minWidth: '100%' }}></div>
            </Row>
          </div>
        </Row>
      </>
    );
  }
  return <p>Access Denied</p>;
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Profile;
