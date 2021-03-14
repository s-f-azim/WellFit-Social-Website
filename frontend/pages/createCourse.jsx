import { Row, Col } from 'antd';
import { getSession } from 'next-auth/client';
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
