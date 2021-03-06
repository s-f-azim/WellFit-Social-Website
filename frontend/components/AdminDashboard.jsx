import { Card, Row, Statistic } from 'antd';
import { FundProjectionScreenOutlined } from '@ant-design/icons';

import axios from 'axios';
import API from '../config';

const AdminDashboard = () => {
  const getUserCount = () =>
    axios
      .get(`${API}/user?role=admin`)
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

  const title = (
    <h1>
      <FundProjectionScreenOutlined /> Administrative Dashboard
    </h1>
  );

  return (
    <div className="adminDashboard">
      {getUserCount()}
      <Row type="flex" justify="center">
        <Card title={title}>
          <Statistic title="Active Users" value={112893} />
        </Card>
      </Row>
    </div>
  );
};
export default AdminDashboard;
