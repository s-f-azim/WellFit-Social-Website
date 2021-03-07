import { Card, Row, Statistic, Tabs } from 'antd';
import {
  FundProjectionScreenOutlined,
  BarChartOutlined,
  UserAddOutlined,
  StopOutlined,
  BugOutlined,
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
      <UserAddOutlined /> Verify users
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

  return (
    <div className="adminDashboard">
      <Row type="flex">
        <Card title={title}>
          <Tabs size="large" defaultActiveKey="1" tabPosition="left">
            <TabPane key="1" tab={statisticsTitle}>
              <Statistic title="Registered users" value={count} />
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
