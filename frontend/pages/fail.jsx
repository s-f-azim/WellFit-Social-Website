import { Result, Button } from 'antd';
import Link from 'next/link';

const Fail = () => (
  <Result
    status="error"
    title="Submission failed or cancelled"
    extra={[
      <Button type="primary">
        <Link href="/">Go back to home page</Link>
      </Button>,
    ]}
  />
);

export default Fail;
