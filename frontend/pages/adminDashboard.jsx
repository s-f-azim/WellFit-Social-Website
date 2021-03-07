import { Card, Row, Statistic } from 'antd';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { getUsers } from '../actions/user';

const AdminDashboard = ({ count }) => {
  console.log(count);
  const title = (
    <h1>
      <FundProjectionScreenOutlined /> Administrative Dashboard
    </h1>
  );

  return (
    <div className="adminDashboard">
      <Row type="flex" justify="center">
        <Card title={title}>
          <Statistic title="Active Users" value={count} />
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
