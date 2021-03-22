import { Result } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const subTitle = (
  <>
    <WarningOutlined /> Sorry, the page you visited does not exist.
  </>
);

const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle={subTitle}
    extra={
      <>
        Go back <a href="/">home</a>?
      </>
    }
  />
);
export default NotFoundPage;
