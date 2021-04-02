import { Row, Col } from 'antd';
import Review from '../components/userComponents/reviewComponents/Review';
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
  const reviews = await getReviews('6054d68c077dc3dfd17a1492');
  const reviewUser = {
    _id: '6054d68c077dc3dfd17a1492',
    reviews,
  };
  return { props: { reviewUser }, revalidate: 60 * 2 };
}
