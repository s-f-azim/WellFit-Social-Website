import { useRouter } from 'next/router';
import { Button, Row, Card, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../services/auth';
import { deleteUser } from '../actions/user';

const settingsPage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  // redirect to home page if user not logged in or user deleted
  // -> why is it necessary? breaks refreshing the age...
  /* useEffect(() => {
    if (!user) router.push('/');
  }, []); */

  const deleteAccount = async () => {
    const response = await deleteUser();
    if (response.data.success) {
      setUser(null);
      router.push('/');
    }
  };

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    deleteAccount();
  };

  const handleCancel = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className="settings">
      <Row type="flex" justify="center">
        <Card>
          <Button onClick={showAlert} type="primary" danger>
            Delete my account
          </Button>
          <Modal
            closable={false}
            okText="CONFIRM"
            okButtonProps={{ style: { background: 'red', border: 'red' } }}
            title="Are you sure?"
            visible={isAlertVisible}
            onCancel={handleCancel}
            onOk={handleOk}
          >
            <p>
              This action is irreversible, your account will be completely destroyed and to use our
              services again, you will have to create a new one.
            </p>
          </Modal>
        </Card>
      </Row>
    </div>
  );
};

export default settingsPage;
