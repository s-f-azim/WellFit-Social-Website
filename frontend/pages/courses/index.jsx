import { Card, Row, Col } from 'antd';
import Image from 'next/image';
import api from '../../services/api';

const Courses = ({ courses }) => {
  console.log(courses);
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      style={{ marginTop: '5rem' }}
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
    >
      {courses.map((course) => (
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
      ))}
    </Row>
  );
};

export async function getStaticProps() {
  const response = await api.get('/courses');
  return { props: { courses: response.data.data } };
}

export default Courses;
