import { Row, Col } from 'antd';
import Review from '../components/Review';
import { getReviews } from '../actions/review';

export default function ReviewPage({ reviewUser }) {
  return (
    <>
      <Row style={{ height: '100vh' }} align="middle">
        <Col lg={{ span: 14, offset: 5 }}>
          <Review reviewUser={reviewUser} />
        </Col>
      </Row>
    </>
  );
}

export async function getStaticProps() {
  const reviews = await getReviews('6044bd0315a05e2266f11abe');
  const reviewUser = {
    _id: '6044bd0315a05e2266f11abe',
    reviews,
  };
  return { props: { reviewUser }, revalidate: 60 * 2 };
}
