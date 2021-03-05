import { Row, Col } from 'antd';
import ReviewList from '../components/ReviewList';
import ReviewInput from '../components/ReviewInput';

export default function ReviewPage() {
  const reviews = [
    {
      author: { _id: '1', name: 'Bob' },
      rate: 4,
      comment: 'Hello',
    },
  ];

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
