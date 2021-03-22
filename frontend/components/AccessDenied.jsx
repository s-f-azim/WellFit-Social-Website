import { WarningOutlined } from '@ant-design/icons';
import { Result, Button, Row } from 'antd';

const subTitle = (
  <div>
    <WarningOutlined /> Access to this page has been denied. Try to <a href="/login">sign in</a>?
  </div>
);

const AccessDenied = () => (
  <Result
    className="AccessDenied"
    status="403"
    title="403"
    subTitle={subTitle}
    extra={
      <>
        Alternatively, go back <a href="/">home</a>.
      </>
    }
  />
);
export default AccessDenied;
