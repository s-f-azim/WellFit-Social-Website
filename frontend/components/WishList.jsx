import { Row, Col } from 'antd';
import CourseCard from './CourseCard';
import api from '../services/api';
import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const WishList = () => {
  // state for the wish list
  const [showState, setShowState] = useState(false);
  // the courses in the user's wish list
  const [courses, setCourses] = useState({});

  useEffect(async () => {
    const response = await api.get('/users/wishlist');
    setCourses(response.data.data);
    // wish list can be shown once the courses in the wish list have been fetched
    setShowState(true);
  }, []);

  return (
    <div>
      {/**
       * If showState is false, then display a loading circle. If it is true and there are no
       * courses in the user's wish list, display some text informing the user that their wish list
       * is empty. Else, display each course in the wish list using the CourseCard component.
       */}
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
                <Col key={course._id} md={8}>
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
      <br />
      <br />
    </div>
  );
};

export default WishList;
