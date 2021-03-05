import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row } from 'antd';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  return (
    <div>
      <Row type="flex" justify="center" align="middle">
        <Space
          direction="horizontal"
          size="large"
          style={{ border: 'solid', borderWidth: '0.1rem', borderRadius: '1rem' }}
        >
          <Button type="link" size="large">
            Favourites
          </Button>
          <Button type="link" size="large">
            Following
          </Button>
          <Button type="link" size="large">
            Wish List
          </Button>
          <Button type="link" size="large">
            Suggestions
          </Button>
        </Space>
      </Row>
    </div>
  );
};

export default Profile;
