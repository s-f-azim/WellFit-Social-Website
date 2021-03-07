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
import { getUsers } from '../actions/user';

const { TabPane } = Tabs;

const AdminDashboard = ({ count }) => {
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
                <Col span={6}>
                  <Statistic prefix={<UserOutlined />} title="Registered users" value={count} />
                </Col>
                <Col span={6}>
                  <Statistic prefix={<UserOutlined />} title="Registered users" value={count} />
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
  const response = await getUsers();

  return {
    props: {
      count: response.data.count,
    },
  };
}

export default AdminDashboard;
