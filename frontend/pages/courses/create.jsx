import { Row, Col } from 'antd';
import { getSession } from 'next-auth/client';
import CourseForm from '../../components/userComponents/courseComponents/CourseForm';

export default function Create() {
  return (
    <div className="create">
      <Row justify="center" align="middle">
        <CourseForm />
      </Row>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
