import { Card, Row, Col, Pagination } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import api from '../../services/api';

const Courses = ({ courses, total }) => {
  return (
    <>
      <Row
        type="flex"
        align="middle"
        justify="center"
        style={{ margin: '5rem', minHeight: '65vh', padding: '2rem' }}
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {courses.map((course) => (
          <Link href={`/courses/${course._id}`} key={course._id}>
            <Col key={course._id}>
              <Card
                style={{ width: 300 }}
                cover={
                  <Image
                    src={
                      course.photos[0]
                        ? `data:image/jpeg;base64,${Buffer.from(course.photos[0].data).toString(
                            'base64'
                          )}`
                        : '/not-found.png'
                    }
                    width={300}
                    height={300}
                  />
                }
              >
                <Card.Meta title={course.title} description={course.description} />
                <h1> {course.price === 0 ? 'Free' : `${course.price} $`}</h1>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ marginTop: '2rem', minHeight: '15vh' }}
      >
        <Pagination
          defaultCurrent={1}
          total={{ total } / 20 > 0 ? total / 20 : 20}
          pageSize={2}
          onChange={(page) => Router.push(`/courses/pages/${page}`)}
        />
      </Row>
    </>
  );
};

export async function getStaticProps({ params }) {
  const currentPage = params ? params.page : undefined;
  const currentPageNumber = currentPage || 1;
  const response = await api.get(`/courses?page=${currentPageNumber}`);
  return {
    props: { courses: response.data.data, total: response.data.pagination.total },
    revalidate: 60 * 2,
  };
}

export default Courses;
