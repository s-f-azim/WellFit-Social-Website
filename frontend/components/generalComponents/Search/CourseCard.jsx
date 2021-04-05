import { Card, Row, Col, Modal, Button, Typography, Divider } from 'antd';
import {
  CarOutlined,
  DeleteOutlined,
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  ProfileOutlined,
  UserOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getCourseCreators } from '../../../actions/course';

const CourseCard = ({ content, isWish, removeFromWishList }) => {
  // state for the modal pop up
  const [visible, setVisible] = useState(false);
  // state for showing the course card
  const [showState, setShowState] = useState(false);
  // list of creators of this course
  const [creators, setCreators] = useState({});

  useEffect(async () => {
    try {
      const response = await getCourseCreators(content._id);
      setCreators(response.data.data);
      // now that the creators of the course have been fetched, the course card can be shown
      setShowState(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const courseDetails = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      {/* If showState is currently false, display nothing. Once it is true, display the card */}
      {showState ? (
        <div className="course-card">
          <Card style={{ borderColor: '#ffa277', borderRadius: '0.5rem', background: '#ffeee6' }}>
            <Row>
              <Col span={20}>
                <Typography.Title
                  className="title"
                  onClick={() => setVisible(true)}
                  ellipsis
                  style={{ width: '100%' }}
                >
                  <ZoomInOutlined /> {content.title}
                </Typography.Title>
                <Divider style={{ borderTop: '1px solid #ffa277' }} />
              </Col>
              {/* If isWish is true, the card is in the wish list and therefore should have a
               * delete icon so that it can be removed from the wish list. */}
              {isWish === true ? (
                <Col span={4}>
                  <DeleteOutlined className="delete-icon" onClick={() => removeFromWishList()} />
                </Col>
              ) : (
                <Col span={4}>
                  <div style={{ minWidth: '2rem' }} />
                </Col>
              )}
            </Row>

            <Row>
              <Col className="card-image">
                <Image
                  src={
                    content.photos[0]
                      ? `data:image/png;base64,${Buffer.from(content.photos[0].data).toString(
                          'base64'
                        )}`
                      : '/image-not-found.svg'
                  }
                  width={100}
                  height={100}
                />
              </Col>
              <Col className="course-details">
                <p>
                  <strong>Price:</strong> ${content.price}
                </p>
                <div style={courseDetails}>
                  <strong>Creators: </strong>
                  {creators.map((creator) => (
                    <div className="creators" key={creator._id}>
                      {creator.fName} {creator.lName}
                    </div>
                  ))}
                </div>
                <p />
                <p style={courseDetails}>
                  <strong>Difficulty: </strong>
                  {content.fitnessLevel}
                </p>
                <div style={courseDetails}>
                  <strong>Tags: </strong>
                  {content.tags.map((tag) => (
                    <div className="tags" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
          <Modal
            title={
              <h1>
                <ProfileOutlined /> {content.title}
              </h1>
            }
            centered
            visible={visible}
            onCancel={() => setVisible(false)}
            width={700}
            footer={[
              <Button
                aria-label="goToCoursePage"
                type="primary"
                href={`/courses/${content._id}`}
                key={content._id}
              >
                <div style={{ color: '#ffa277' }}>Go to course page</div>
              </Button>,
            ]}
          >
            <Row justify="center" align="middle" className="course-card">
              <Col className="modal-image">
                <Image
                  src={
                    content.photos[0]
                      ? `data:image/png;base64,${Buffer.from(content.photos[0].data).toString(
                          'base64'
                        )}`
                      : '/image-not-found.svg'
                  }
                  width={200}
                  height={200}
                />
              </Col>
              <Divider />
              <Col>
                <p>
                  <strong>Price: </strong>${content.price}
                </p>
                <div>
                  <strong>Creators: </strong>
                  {creators.map((creator) => (
                    <div className="creators" key={creator._id}>
                      {creator.fName} {creator.lName} <strong>|</strong>
                    </div>
                  ))}
                </div>
                <p />
                <div>
                  <strong>Tags: </strong>
                  {content.tags.map((tag) => (
                    <div className="tags" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
                <p />
                <p>
                  <strong>Description: </strong>
                  {content.description}
                </p>

                {content.gym ? (
                  <li>
                    - You need access to a gym for this course <CarOutlined />.
                  </li>
                ) : (
                  <li>
                    - You can take this course from home <HomeOutlined />.
                  </li>
                )}
                {content.isVirtual ? (
                  <li>
                    - This is an in-person course <UserOutlined />.
                  </li>
                ) : (
                  <li>
                    - This is a virtual course <DesktopOutlined />.
                  </li>
                )}
              </Col>
            </Row>
          </Modal>
        </div>
      ) : null}
    </>
  );
};
export default CourseCard;
