import { Card, Row, Col, Modal, Space, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '../../../services/api';

const CourseCard = ({ content, isWish, removeFromWishList }) => {
  // state for the modal pop up
  const [visible, setVisible] = useState(false);
  // state for showing the course card
  const [showState, setShowState] = useState(false);
  // list of creators of this course
  const [creators, setCreators] = useState({});

  useEffect(async () => {
    const response = await api.get(`/courses/${content._id}/creators`);
    setCreators(response.data.data);
    // now that the creators of the course have been fetched, the course card can be shown
    setShowState(true);
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
          <Card style={{ borderColor: 'black', borderRadius: '1rem' }}>
            <Row style={{ paddingBottom: '1rem' }}>
              <Col span={20}>
                <Typography.Title
                  className="title"
                  onClick={() => setVisible(true)}
                  ellipsis={true}
                  style={{ width: '100%' }}
                >
                  {content.title}
                </Typography.Title>
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
                <p style={courseDetails}>
                  Location: {content.address ? content.address : ' No location specified'}
                </p>
                <p>Price: £{content.price}</p>
                <p style={courseDetails}>
                  Creators:{' '}
                  {creators.map((creator) => (
                    <div className="creators">
                      {creator.fName} {creator.lName}
                    </div>
                  ))}
                </p>
                <p style={courseDetails}>
                  Tags:{' '}
                  {content.tags.map((tag) => (
                    <div className="tags">{tag}</div>
                  ))}
                </p>
              </Col>
            </Row>
          </Card>
          <Modal
            title={content.title}
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            footer={[
              <Button type="primary" href={`/courses/${content._id}`} key={content._id}>
                Go to course page
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
              <Col>
                <p>
                  Location:
                  {content.address ? content.address : ' No location specified'}
                </p>
                <p>Price: £{content.price}</p>
                <p>
                  Creators:{' '}
                  <Space direction="horizontal">
                    {creators.map((creator) => (
                      <div>
                        {creator.fName} {creator.lName}
                      </div>
                    ))}
                  </Space>
                </p>
                <p>
                  Tags:{' '}
                  <Space direction="horizontal">
                    {content.tags.map((tag) => (
                      <div className="tags">{tag}</div>
                    ))}
                  </Space>
                </p>
                <p>Description: {content.description}</p>
              </Col>
            </Row>
          </Modal>
        </div>
      ) : null}
    </>
  );
};
export default CourseCard;
