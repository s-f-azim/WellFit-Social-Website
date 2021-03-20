import { Card, Row, Col, Modal, Space, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import api from '../services/api';

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

  return (
    <>
      {/* If showState is currently false, display nothing. Once it is true, display the card*/}
      {showState ? (
        <div>
          <Card className="course-card" style={{ borderColor: 'black', borderRadius: '1rem' }}>
            <div style={{ paddingBottom: '5rem' }}>
              <h1 className="title" onClick={() => setVisible(true)}>
                {content.title}
              </h1>
              {/* If isWish is true, the card is in the wish list and therefore should have a
               * delete icon so that it can be removed from the wish list.*/}
              {isWish === true ? (
                <DeleteOutlined className="delete-icon" onClick={() => removeFromWishList()} />
              ) : (
                <div style={{ minWidth: '2rem' }}></div>
              )}
            </div>

            <Row style={{ maxHeight: '50%' }}>
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
              <Col>
                <p>Location: {content.location.city}</p>
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
                      <div className="emphasised-item">{tag}</div>
                    ))}
                  </Space>
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
                <p>Location: {content.location.city}</p>
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
                      <div className="emphasised-item">{tag}</div>
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
