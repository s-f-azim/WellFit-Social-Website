import { Card, Row, Col, Modal, Space, Button, notification } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import api from '../services/api';
import ReactDOM from 'react-dom';

const CourseCard = ({ content, isWish }) => {
  const [visible, setVisible] = useState(false);
  const [showState, setShowState] = useState(false);
  const [creators, setCreators] = useState({});

  useEffect(async () => {
    const response = await api.get(`/courses/${content._id}/creators`);
    setCreators(response.data.data);
    setShowState(true);
  }, []);

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
      {showState ? (
        <div id={content._id}>
          <Card className="course-card" style={{ borderColor: 'black', borderRadius: '1rem' }}>
            <div style={{ paddingBottom: '5rem' }}>
              <h1 className="title" onClick={() => setVisible(true)}>
                {content.title}
              </h1>
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
                <p>{content.location.city}</p>
                <p>£{content.price}</p>
                <p>
                  <Space direction="horizontal">
                    {creators.map((creator) => (
                      <div>{creator.name}</div>
                    ))}
                  </Space>
                </p>
                <p>
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
            <Row justify="center" align="middle" className="course-card">
              <Col className="card-modal-image">
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
                <p>{content.location.city}</p>
                <p>{content.price}</p>
                <p>
                  <Space direction="horizontal">
                    {creators.map((creator) => (
                      <div>{creator.name}</div>
                    ))}
                  </Space>
                </p>
                <p>
                  <Space direction="horizontal">
                    {content.tags.map((tag) => (
                      <div className="emphasised-item">{tag}</div>
                    ))}
                  </Space>
                </p>
                <p>{content.description}</p>
              </Col>
            </Row>
          </Modal>
        </div>
      ) : null}
    </>
  );
};
export default CourseCard;
