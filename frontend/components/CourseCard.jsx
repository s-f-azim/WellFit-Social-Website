import { Card, Row, Col, Modal, Space, Button, notification } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import api from '../services/api';
import ReactDOM from 'react-dom';

const CourseCard = ({ content, isWish }) => {
  const [visible, setVisible] = useState(false);
  const courseID = content._id;

  function removeFromWishList() {
    api.patch(`/users/addToWishList/${content._id}`, {});
    notification.open({
      message: 'Wish list updated!',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
    ReactDOM.render(
      <div style={{ minWidth: '25rem', minHeight: '18rem' }}></div>,
      document.getElementById(`${courseID}`)
    );
  }

  return (
    <>
      <div id={courseID}>
        <Card className="course-card" style={{ borderColor: 'black', borderRadius: '1rem' }}>
          <Row>
            <Col className="card-title-col">
              <h1 className="title" onClick={() => setVisible(true)}>
                {content.title}
              </h1>
            </Col>
            <Col id="delete-icon">
              {isWish === true ? (
                <DeleteOutlined className="delete-icon" onClick={() => removeFromWishList()} />
              ) : (
                <div style={{ minWidth: '2rem' }}></div>
              )}
            </Col>
          </Row>
          <br />
          <Row style={{ maxHeight: '15rem' }}>
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
              <p>creators</p> {/* to-do:  grab the creators from the database*/}
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
              <p>creators</p> {/* to-do:  grab the creators from the database*/}
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
    </>
  );
};
export default CourseCard;
