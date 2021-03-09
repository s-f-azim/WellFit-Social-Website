import { Space, Row, Col } from 'antd';
import CourseCard from './CourseCard';
import { useAuth } from '../services/auth';

const WishList = () => {
  const { user } = useAuth();

  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {user.wishList.length === 0 ? (
          <p> Your wish list is currently empty.</p>
        ) : (
          <>
            <Row type="flex" justify="center" align="middle">
              <Col className="card-col">{/*<CourseCard />*/}</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}</Col>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <Col className="card-col">{/*<CourseCard />*/}</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}</Col>
            </Row>
            <br />
            <br />
            <br />
            The length of the wishlist is {user.wishList.length}
            <br />
            The id of the course is: {user.wishList[0]}
            <br />
          </>
        )}
      </Space>
    </div>
  );
};

//border: 'solid', borderWidth: '0.1rem'

export default WishList;
