import { Row, Col, List } from 'antd';
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
       * is empty. Else, display each course in the wish list using the CourseCard component. Give
       * the List.Item the id of the course so that it can have the class changed when the course is
       * deleted from the wish list. This removes the margin so that a deleted course occupies no space
       * at all.
       */}
      {showState ? (
        courses.length > 0 ? (
          <>
            <List
              grid={{ xs: 1 }}
              dataSource={courses}
              renderItem={(course) => (
                <List.Item className="course" id={course._id}>
                  <CourseCard content={course} isWish={true} />
                </List.Item>
              )}
            />
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
