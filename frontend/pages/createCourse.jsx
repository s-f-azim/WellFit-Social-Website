import { Row, Col } from 'antd';
import CourseForm from '../components/CourseForm';

export default function CreateCourse() {
  return (
    <Row style={{ height: '100vh' }} align="middle">
      <Col lg={{ span: 14, offset: 5 }}>
        <CourseForm />
      </Col>
    </Row>
  );
}
