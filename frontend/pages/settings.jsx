import { Router, useRouter } from 'next/router';
import {
  SettingOutlined,
  UserOutlined,
  BugOutlined,
  CheckCircleOutlined,
  StopOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Row, Card, Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '../services/auth';
import { deleteUser } from '../actions/user';

const settingsPage = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const { TabPane } = Tabs;

  const settingsTitle = (
    <h1>
      <SettingOutlined /> Settings
    </h1>
  );

  const myAccount = (
    <h3>
      <UserOutlined /> My account
    </h3>
  );

  const bugReport = (
    <h3>
      <BugOutlined /> report a bug
    </h3>
  );

  const verifyMe = (
    <h3>
      <CheckCircleOutlined /> Verify my profile
    </h3>
  );

  const UserReport = (
    <h3>
      <StopOutlined /> report a user
    </h3>
  );

  const feedback = (
    <h3>
      <BugOutlined /> Give us some feedback!
    </h3>
  );

  // redirect to home page if user not logged in or user deleted
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

  const editProfile = () => {
    router.push('/editProfile');
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
      <Row type="flex" justify="left">
        <Card className="mainCard" size="default" title={settingsTitle}>
          <Tabs size="small" defaultActiveKey="1" tabPosition="left">
            <TabPane key="1" tab="General">
              <Card className="settingCard" title={myAccount}>
                <Button
                  onClick={editProfile}
                  type="primary"
                  style={{ background: '#03dbfc', border: '#03dbfc' }}
                >
                  Edit profile information
                </Button>
                <br />
                <br />
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
                    This action is irreversible, your account will be completely destroyed and to
                    use our services again, you will have to create a new one.
                  </p>
                </Modal>
              </Card>
            </TabPane>
            <TabPane key="2" tab="Privacy">
              privacy
            </TabPane>
            <TabPane key="3" tab="Miscellaneous">
              <Card className="settingCard" title={bugReport}>
                bug report
              </Card>
              <Card className="settingCard" title={verifyMe}>
                Verify me
              </Card>
              <Card className="settingCard" title={UserReport}>
                Report something
              </Card>
              <Card className="settingCard" title={feedback}>
                suggest something!
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </Row>
    </div>
  );
};

export default settingsPage;
