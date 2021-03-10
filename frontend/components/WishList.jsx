import { Space, Row, Col, Button } from 'antd';
import CourseCard from './CourseCard';

const WishList = ({ user }) => {
  return (
    <div style={{ width: '100%' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {user.wishList.length === 0 ? (
          <p> Your wish list is currently empty.</p>
        ) : (
          <>
            <Row type="flex" justify="center" align="middle" style={{ textAlign: 'center' }}>
              <Col className="card-col">{/*<CourseCard />*/}1</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}2</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}3</Col>
            </Row>
            <Row type="flex" justify="center" align="middle" style={{ textAlign: 'center' }}>
              <Col className="card-col">{/*<CourseCard />*/}4</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}5</Col>
              <Col style={{ width: '2rem' }}></Col>
              <Col className="card-col">{/*<CourseCard />*/}6</Col>
            </Row>
            <br />
            <br />
            <br />
            <div style={{ display: 'inline-block' }}>
              Your wishlist contains {user.wishList.length} course(s)
            </div>
            <br />
            The id of the first course is: {user.wishList[0]}
            <br />
          </>
        )}
        {user.name}
      </Space>
    </div>
  );
};

export default WishList;
