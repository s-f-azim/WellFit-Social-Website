import { Row, Col } from 'antd';
import CourseCard from './CourseCard';

const WishList = ({ courses }) => {
  return (
    <div>
      {courses.length === 0 ? (
        <p> Your wish list is currently empty.</p>
      ) : (
        <>
          <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ minHeight: '65vh' }}
            gutter={[
              { xs: 30, sm: 16, md: 24, lg: 32 },
              { xs: 30, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {courses.map((course) => (
              <Col key={course._id}>
                <CourseCard content={course} isWish={true} />
              </Col>
            ))}
          </Row>
          <br />
        </>
      )}
    </div>
  );
};

export default WishList;
