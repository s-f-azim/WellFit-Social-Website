import { Result, Button } from 'antd';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

const Success = () => (
  <>
    <NextSeo
      title="Successful Payment"
      description="A page indicating that the attempted transaction was a success."
    />
    <Result
      status="success"
      title="Successful process"
      extra={[
        <Button type="primary">
          <Link href="/">Go back to home page</Link>
        </Button>,
      ]}
    />
  </>
);

export default Success;
