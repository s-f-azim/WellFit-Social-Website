import { Row, Col, Card } from 'antd';
import CourseCard from './CourseCard';

const CourseResults = ({ data }) => (
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
    {data.map((course) => (
      <Col key={course._id}>
        <CourseCard content={course} isWish={false} />
      </Col>
    ))}
  </Row>
);

export default CourseResults;
