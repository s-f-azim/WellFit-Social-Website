import { Row, Col } from 'antd';
import UserFeed from '../components/userComponents/postComponents/UserFeed';

export default function PostPage() {
  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={24} md={20} lg={16} xl={12}>
        <UserFeed />
      </Col>
    </Row>
  );
}
