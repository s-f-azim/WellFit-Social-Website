import { Row, Col } from 'antd';
import UserFeed from '../components/UserFeed';

export default function PostPage() {
  return (
    <Row justify="center" align="middle">
      <Col lg={{ span: 14, offset: 5 }}>
        <UserFeed id="604e45c4e73ccc47c728f77c" />
      </Col>
    </Row>
  );
}
