import { Row } from 'antd';
import { getSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';
import CourseForm from '../../components/userComponents/courseComponents/CourseForm';

export default function Create() {
  return (
    <div className="create">
      <NextSeo
        title="Course Creation page"
        description="A page to allow instructors to create courses."
      />
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
