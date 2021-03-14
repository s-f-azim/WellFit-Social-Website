import { Row, Col } from 'antd';
import CourseForm from '../components/CourseForm';

export default function CreateCourse() {
  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col>
        <CourseForm />
      </Col>
    </Row>
  );
}
