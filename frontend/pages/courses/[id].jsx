import { Row, Col, Button, Typography, Space, Divider, Rate } from 'antd';
import Image from 'next/image';
import api from '../../services/api';
const columnStyle = { width: 350, height: 'auto' };

const course = ({ course }) => {
  <Image
    src={
      course.photos[0]
        ? `data:image/jpeg;base64,${Buffer.from(course.photos[0].data).toString('base64')}`
        : '/not-found.png'
    }
    width={300}
    height={300}
  />;
  return (
    <Row
      align="middle"
      justify="center"
      gutter={[
        { xs: 8, sm: 26, md: 44, lg: 52 },
        { xs: 8, sm: 6, md: 14, lg: 22 },
      ]}
      style={{ margin: '2rem' }}
    >
      <Col md={10}>
        <Image
          src={
            course.photos[0]
              ? `data:image/png;base64,${Buffer.from(course.photos[0].data).toString('base64')}`
              : '/image-not-found.svg'
          }
          width={600}
          height={600}
        />
      </Col>
      <Col md={6}>
        <Space direction="vertical" wrap={true}>
          <Typography.Title
            level={1}
            style={{ fontSize: '2.3rem', fontFamily: 'Poppins', ...columnStyle }}
          >
            {course.title}
          </Typography.Title>
          <Divider />
          <Rate disabled defaultValue={4} />
          <Divider />
          <Typography.Title level={2}>
            {course.price > 0 ? `Price: $${course.price}` : 'Free'}
          </Typography.Title>
          <Divider />
          <Typography.Paragraph style={{ fontSize: '1.4rem', color: 'grey' }}>
            Description: {course.description}
          </Typography.Paragraph>
          <Divider />
          <Space>
            {course.tags.map((tag) => (
              <h3>{`#${tag}`}</h3>
            ))}
          </Space>
          <Button type="primary" shape="round" size="large">
            Would like to buy it
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log('hmm');
  const courseId = params ? params.id : undefined;
  const response = await api.get(`/courses/${courseId}`);
  return { props: { course: response.data.data }, revalidate: 60 * 10 };
};
export const getStaticPaths = async () => {
  const { data } = await api.get(`/courses?limit=${Number.MAX_SAFE_INTEGER}`);
  console.log(data);
  const paths = data.data.map((course) => {
    return {
      params: {
        id: course._id.toString(),
      },
    };
  });
  return { fallback: false, paths: paths };
};

export default course;