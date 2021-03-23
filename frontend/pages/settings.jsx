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
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Row,
  Card,
  Modal,
  Tabs,
  Form,
  Alert,
  notification,
  Space,
  Input,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { useAuth } from '../services/auth';
import { createRequest } from '../actions/request';
import { deleteUser } from '../actions/user';
import AccessDenied from '../components/AccessDenied';
import ReportButton from '../components/ReportButton';

const settingsPage = () => {
  const [session, loading] = useSession();
  const { Text } = Typography;
  if (session) {
    const { user } = session;

    const router = useRouter();

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
        <MailOutlined /> Inbox
      </h3>
    );

    const deleteAccount = async () => {
      const response = await deleteUser();
      if (response.data.success) {
        session.user = null;
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
    const [hasVerifyError, setHasVerifyError] = useState(false);
    const [VerifyForm] = Form.useForm();
    const [showVerifyTab, setShowVerifyTab] = useState(user.verified);
    console.log(showVerifyTab);
    const onBugReport = async (values) => {
      const { report } = values;
      try {
        const response = await createRequest('bug', report);
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

    const onVerifyRequest = async (values) => {
      const { verifyRequest } = values;
      try {
        const response = await createRequest('verify', verifyRequest);
        notification.open({
          message: 'Request submitted, hope you get verified soon!',
          duration: 3,
          icon: <CheckOutlined style={{ color: '#33FF49' }} />,
        });
        setHasVerifyError(false);
        VerifyForm.resetFields();
      } catch (err) {
        setHasVerifyError(true);
      }
    };

    return (
      <div className="settings">
        <Row type="flex" justify="left">
          <Card className="mainCard" size="default" title={settingsTitle}>
            <Tabs size="large" defaultActiveKey="1" tabPosition="left">
              <TabPane key="1" tab="Account settings">
                <Card className="settingCard" title={myAccount}>
                  <Button onClick={editCredentials} type="text">
                    <EditOutlined />
                    Change my password or email
                  </Button>
                  <br />
                  <br />
                  <Button onClick={editBasic} type="text">
                    <EditOutlined />
                    Edit my basic profile information
                  </Button>
                  <br />
                  <br />
                  <Button onClick={editInDepth} type="text">
                    <EditOutlined />
                    Edit my in-depth profile information
                  </Button>
                  <br />
                  <br />
                  <Button onClick={showAlert} type="text" danger>
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
              <TabPane key="2" tab="Contact us">
                <Card className="settingCard" title={bugReport}>
                  <Form form={form} name="Send a bug report" onFinish={onBugReport}>
                    <Space direction="vertical" size="middle">
                      {hasError && (
                        <Alert
                          type="error"
                          message="something went wrong, please try again"
                          banner
                        />
                      )}
                      <h3>
                        Please describe the bug below <DownCircleOutlined />
                      </h3>
                      <Form.Item name="report">
                        <Input.TextArea allowClear showCount maxLength={150} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit bug report
                        </Button>
                      </Form.Item>
                    </Space>
                  </Form>
                </Card>
                {(user.verified && user.role === 'instructor') || user.role === 'client' ? null : (
                  <Card className="settingCard" title={verifyMe}>
                    <Form form={VerifyForm} name="Update my verify" onFinish={onVerifyRequest}>
                      <Space direction="vertical" size="middle">
                        {hasVerifyError && (
                          <Alert
                            type="error"
                            message="something went wrong, please try again"
                            banner
                          />
                        )}
                        <h3>
                          Why should we verify you <DownCircleOutlined />
                        </h3>
                        <Form.Item name="verifyRequest">
                          <Input.TextArea allowClear showCount maxLength={150} />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit verify request
                          </Button>
                        </Form.Item>
                      </Space>
                    </Form>
                    <Text type="secondary">
                      **If your request is not excepted in 30 days. You are can to try again
                    </Text>
                  </Card>
                )}
                <Card className="settingCard" title={UserReport}>
                  Report something
                </Card>
                <Card className="settingCard" title={feedback}>
                  check your inbox
                </Card>
              </TabPane>
            </Tabs>
          </Card>
        </Row>
      </div>
    );
  }
  return <AccessDenied />;
};

export default settingsPage;
