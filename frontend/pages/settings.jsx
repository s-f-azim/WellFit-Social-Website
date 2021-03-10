import { useRouter } from 'next/router';
import {
  SettingOutlined,
  UserOutlined,
  BugOutlined,
  CheckCircleOutlined,
  StopOutlined,
  MailOutlined,
  WarningOutlined,
  CheckOutlined,
  DownCircleOutlined,
} from '@ant-design/icons';
import { Button, Row, Card, Modal, Tabs, Form, Alert, notification, Space, Input } from 'antd';
import { useState } from 'react';
import { useAuth } from '../services/auth';
import { deleteUser } from '../actions/user';

const settingsPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();

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
      <MailOutlined /> Give us some feedback!
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

  const editCredentials = () => {
    router.push({
      pathname: '/editProfile',
      query: { tab: '3' },
    });
  };

  const editBasic = () => {
    router.push({
      pathname: '/editProfile',
      query: { tab: '1' },
    });
  };

  const editInDepth = () => {
    router.push({
      pathname: '/editProfile',
      query: { tab: '2' },
    });
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

  const [hasError, setHasError] = useState(false);
  const [form] = Form.useForm();

  const onBugReport = async (values) => {
    try {
      notification.open({
        message: 'Report submitted, thanks for helping us!',
        duration: 3,
        icon: <CheckOutlined style={{ color: '#33FF49' }} />,
      });
      form.resetFields();
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <div className="settings">
      <Row type="flex" justify="left">
        <Card className="mainCard" size="default" title={settingsTitle}>
          <Tabs size="small" defaultActiveKey="1" tabPosition="left">
            <TabPane key="1" tab="General">
              <Card className="settingCard" title={myAccount}>
                <Button onClick={editCredentials} type="primary">
                  Change my password or email
                </Button>
                <br />
                <br />
                <Button onClick={editBasic} type="primary">
                  Edit my basic profile information
                </Button>
                <br />
                <br />
                <Button onClick={editInDepth} type="primary">
                  Edit my in-depth profile information
                </Button>
                <br />
                <br />
                <Button onClick={showAlert} type="primary" danger>
                  <WarningOutlined />
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
                <Form form={form} name="Update my info" onFinish={onBugReport} scrollToFirstError>
                  <Space direction="vertical" size="middle">
                    {hasError && (
                      <Alert type="error" message="something went wrong, please try again" banner />
                    )}
                    <h3>
                      Please describe the bug below <DownCircleOutlined />
                    </h3>
                    <Form.Item name="report">
                      <Input.TextArea allowClear showCount maxLength={300} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit bug report
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
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
