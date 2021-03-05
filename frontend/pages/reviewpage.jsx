import { Row, Col } from 'antd';
import ReviewList from '../components/ReviewList';
import ReviewInput from '../components/ReviewInput';
import { getReviews } from '../utils/user';

export default function ReviewPage({ reviews }) {
  return (
    <>
      <Row style={{ height: '100vh' }} align="middle">
        <Col lg={{ span: 14, offset: 5 }}>
          <ReviewList reviews={reviews} />
        </Col>
      </Row>
      <Row style={{ height: '100vh' }} align="middle">
        <Col lg={{ span: 14, offset: 5 }}>
          <ReviewInput userId="6040d829ce76ca180a0fc398" />
        </Col>
      </Row>
    </>
  );
}

export async function getStaticProps() {
  const reviews = await getReviews('6040d829ce76ca180a0fc398');
  return { props: { reviews } };
}
