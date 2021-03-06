import { Row, Col } from 'antd';
import ReviewList from '../components/ReviewList';
import ReviewInput from '../components/ReviewInput';
import { getReviews } from '../utils/review';

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
          <ReviewInput reviewedId="6043978a8a117f2a1e98df14" />
        </Col>
      </Row>
    </>
  );
}

export async function getServerSideProps() {
  const reviews = await getReviews('6043978a8a117f2a1e98df14');
  return { props: { reviews } };
}
