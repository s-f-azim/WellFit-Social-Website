import { Row, Col } from 'antd';
import UserFeed from '../components/UserFeed';

export default function PostPage() {
  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={20} lg={16} xl={12}>
        <UserFeed id="604e45c4e73ccc47c728f77c" />
      </Col>
    </Row>
  );
}
