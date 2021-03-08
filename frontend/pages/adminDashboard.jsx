import { Card, Row, Col, Statistic, Tabs } from 'antd';
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

const { TabPane } = Tabs;

const AdminDashboard = ({ userCount, adminCount, clientCount, instructorCount }) => {
  const title = (
    <h1>
      <FundProjectionScreenOutlined /> Administrative Dashboard
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

  return (
    <div className="adminDashboard">
      <Row type="flex">
        <Card title={title}>
          <Tabs size="large" defaultActiveKey="1" tabPosition="left">
            <TabPane key="1" tab={statisticsTitle}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                  <Statistic prefix={<UserOutlined />} title="No. users" value={userCount} />
                </Col>
                <Col>
                  <Statistic prefix={<UserOutlined />} title="No. clients" value={clientCount} />
                </Col>
                <Col>
                  <Statistic
                    prefix={<UserOutlined />}
                    title="No. instructors"
                    value={instructorCount}
                  />
                </Col>
                <Col>
                  <Statistic prefix={<UserOutlined />} title="No. admins" value={adminCount} />
                </Col>
              </Row>
            </TabPane>
            <TabPane key="2" tab={verifiedTitle}>
              hi
            </TabPane>
            <TabPane key="3" tab={banTitle}>
              hi
            </TabPane>
            <TabPane key="4" tab={bugTitle}>
              hi
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
      userCount: getUsersRes.data.count,
      adminCount: getAdminsRes.data.count,
      clientCount: getClientsRes.data.count,
      instructorCount: getInstructorsRes.data.count,
    },
  };
}

export default AdminDashboard;
