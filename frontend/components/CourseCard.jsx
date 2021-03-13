import { Card, Row, Col, Modal, Space, Button, notification } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ReactDOM from 'react-dom';

const CourseCard = ({ content, isWish }) => {
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

  /**
   * Remove this course from the user's wish list and replace the card with a blank space
   */
  function removeFromWishList() {
    api.patch(`/users/addToWishList/${content._id}`, {});
    notification.open({
      message: 'Wish list updated!',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
    ReactDOM.render(
      <div style={{ minWidth: '25rem', minHeight: '18rem' }}></div>,
      document.getElementById(`${content._id}`)
    );
  }

  return (
    <>
      {/* If showState is currently false, display nothing. Once it is true, display the card*/}
      {showState ? (
        <div id={content._id}>
          {/* Place the course in a div with the id of the course so it can be removed easily */}
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
                      <div>{creator.name}</div>
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
              <Link href={`/courses/${content._id}`} key={content._id}>
                <Button type="primary">Go to course page</Button>
              </Link>,
            ]}
          >
            <Row justify="center" align="middle">
              <Col>
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
              <Col span={3}></Col>
              <Col>
                <p>Location: {content.location.city}</p>
                <p>Price: £{content.price}</p>
                <p>
                  Creators:{' '}
                  <Space direction="horizontal">
                    {creators.map((creator) => (
                      <div>{creator.name}</div>
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
