import { WarningOutlined } from '@ant-design/icons';
import { Row } from 'antd';

const AccessDenied = () => (
  <Row type="flex" justify="center">
    <h1 className="AccessDenied">
      <WarningOutlined /> Access to this page has been denied. Try to <a href="/login">sign in</a>?
    </h1>
  </Row>
);

export default AccessDenied;
