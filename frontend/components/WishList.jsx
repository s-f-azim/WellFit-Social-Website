import { Row, Col } from 'antd';
import CourseCard from './CourseCard';
import api from '../services/api';
import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const WishList = () => {
  const [showState, setShowState] = useState(false);
  const [courses, setCourses] = useState({});

  useEffect(async () => {
    const response = await api.get('/users/wishlist');
    setCourses(response.data.data);
    setShowState(true);
  }, []);

  return (
    <div>
      {showState ? (
        courses.length > 0 ? (
          <>
            <Row
              type="flex"
              align="middle"
              justify="center"
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
        ) : (
          <p>Your wish list is currently empty</p>
        )
      ) : (
        <LoadingOutlined style={{ fontSize: '2rem' }} />
      )}
    </div>
  );
};

export default WishList;
