import { List, notification } from 'antd';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CourseCard from '../generalComponents/Search/CourseCard';
import { getWishList, updateWishList } from '../../actions/user';

const WishList = () => {
  // state for the wish list
  const [showState, setShowState] = useState(false);
  // the courses in the user's wish list
  const [courses, setCourses] = useState({});

  useEffect(async () => {
    try {
      const response = await getWishList();
      setCourses(response.data.data);
      // wish list can be shown once the courses in the wish list have been fetched
      setShowState(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**
   * Remove course with id equal to parameter id from the user's wish list and replace the card with
   * nothing so the user can see it is gone. Also, change the class of the List.Item so that it no longer
   * has a margin.
   */
  function removeFromWishList(id) {
    updateWishList(id);
    notification.open({
      message: 'Wish list updated!',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
    ReactDOM.render(null, document.getElementById(`${id}`));
    document.getElementById(`${id}`).className = 'deleted-course';
  }

  return (
    <div>
      {/**
       * If showState is false, then display a loading circle. If it is true and there are no
       * courses in the user's wish list, display some text informing the user that their wish list
       * is empty. Else, display each course in the wish list using the CourseCard component. Give
       * the List.Item the id of the course so that it can have the class changed when the course is
       * deleted from the wish list. This removes the margin so that a deleted course occupies no
       * space at all. Pass the removeFromWishList function with the parameter id to the CourseCard
       * component so that it can invoke the function when the delete icon is clicked.
       */}
      {showState ? (
        courses.length > 0 ? (
          <>
            <List
              grid={{ xs: 1 }}
              dataSource={courses}
              renderItem={(course) => (
                <List.Item className="course" id={course._id}>
                  <CourseCard
                    content={course}
                    isWish={true}
                    removeFromWishList={() => removeFromWishList(course._id)}
                  />
                </List.Item>
              )}
            />
            <br />
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>Your wish list is currently empty</p>
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
