import { Card } from 'antd';
import { FundProjectionScreenOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  const title = (
    <h1>
      <FundProjectionScreenOutlined /> Administrative Dashboard
    </h1>
  );

  return (
    <div className="adminDashboard">
      <Card title={title}>hi</Card>
    </div>
  );
};
export default AdminDashboard;
