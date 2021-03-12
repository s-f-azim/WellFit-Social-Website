import { Card, Row, Col, Statistic, Tabs, Button, Modal } from 'antd';
import {
  FundProjectionScreenOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  StopOutlined,
  BugOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getUsers, getAdmins, getClients, getInstructors } from '../actions/user';
import { useState } from 'react';

const { TabPane } = Tabs;

const AdminDashboard = ({ userCount, adminCount, clientCount, instructorCount }) => {
  const title = (
    <h1>
      <FundProjectionScreenOutlined /> Admin Dashboard
    </h1>
  );
  const statisticsTitle = (
    <p>
      <BarChartOutlined /> Statistics
    </p>
  );

  const verifiedTitle = (
    <p>
      <CheckCircleOutlined /> Verify users
    </p>
  );

  const banTitle = (
    <p>
      <StopOutlined /> Ban users
    </p>
  );

  const bugTitle = (
    <p>
      <BugOutlined /> Bug reports
    </p>
  );

  const contactTitle = (
    <p>
      <MailOutlined /> contact users
    </p>
  );

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const handleOk = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className="adminDashboard">
      <Row justify="left" type="flex">
        <Card title={title}>
          <Tabs size="small" defaultActiveKey="1" tabPosition="left">
            <TabPane key="1" tab={statisticsTitle}>
              <Col span={16}>
                <Statistic prefix={<UserOutlined />} title="No. users" value={userCount} />
                <br />
              </Col>
              <Col span={16}>
                <Statistic prefix={<UserOutlined />} title="No. clients" value={clientCount} />
                <br />
              </Col>
              <Col span={16}>
                <Statistic
                  prefix={<UserOutlined />}
                  title="No. instructors"
                  value={instructorCount}
                />
                <br />
              </Col>
              <Col span={16}>
                <Statistic prefix={<UserOutlined />} title="No. admins" value={adminCount} />
                <br />
              </Col>
            </TabPane>
            <TabPane key="2" tab={verifiedTitle}>
              hi
            </TabPane>
            <TabPane key="3" tab={banTitle}>
              hi
            </TabPane>
            <TabPane key="4" tab={bugTitle}>
              <Button onClick={showAlert} type="text">
                Request
              </Button>
              <Modal
                closable={false}
                okText="Close"
                title="Report #1"
                cancelButtonProps={{ style: { display: 'none' } }}
                visible={isAlertVisible}
                onOk={handleOk}
              >
                <p>content of report</p>
              </Modal>
            </TabPane>
            <TabPane key="5" tab={contactTitle}>
              hi
            </TabPane>
          </Tabs>
        </Card>
      </Row>
    </div>
  );
};

export async function getStaticProps() {
  const getUsersRes = await getUsers();
  const getAdminsRes = await getAdmins();
  const getClientsRes = await getClients();
  const getInstructorsRes = await getInstructors();
  return {
    props: {
      userCount: getUsersRes.data.pagination.total,
      adminCount: getAdminsRes.data.pagination.adminTotal,
      clientCount: getClientsRes.data.pagination.clientTotal,
      instructorCount: getInstructorsRes.data.pagination.instructorTotal,
    },
  };
}

export default AdminDashboard;
