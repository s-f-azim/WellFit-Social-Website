import { Result, Button } from 'antd';
import Link from 'next/link';

const Success = () => (
  <Result
    status="success"
    title="Successful process"
    extra={[
      <Button type="primary">
        <Link href="/">Go back to home page</Link>
      </Button>,
    ]}
  />
);

export default Success;
