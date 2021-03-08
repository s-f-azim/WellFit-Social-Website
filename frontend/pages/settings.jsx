import { useRouter } from 'next/router';
import { Button, Row, Card } from 'antd';
import { useEffect } from 'react';
import { useAuth } from '../services/auth';
import { deleteUser } from '../actions/user';

const settingsPage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  // redirect to home page if user not logged in or user deleted
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  const onDeleteClick = async () => {
    const response = await deleteUser();
    if (response.data.success) {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <Row type="flex" justify="center" align="middle">
      <Card>
        <Button onClick={onDeleteClick} type="primary" danger>
          Delete
        </Button>
      </Card>
    </Row>
  );
};

export default settingsPage;
