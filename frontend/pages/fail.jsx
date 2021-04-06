import { Result, Button } from 'antd';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

const Fail = () => (
  <>
    <NextSeo
      title="Failed Payment"
      description="A page indicating that the attempted transaction was a failure."
    />
    <Result
      status="error"
      title="Submission failed or cancelled"
      extra={[
        <Button type="primary">
          <Link href="/">Go back to home page</Link>
        </Button>,
      ]}
    />
  </>
);

export default Fail;
