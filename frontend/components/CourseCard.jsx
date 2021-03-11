import { Card, Row, Col, Modal, Space, Button, notification } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import api from '../services/api';

const CourseCard = ({ content, isWish }) => {
  const [visible, setVisible] = useState(false);

  function removeFromWishList() {
    api.patch(`/users/addToWishList/${content._id}`, {});
    notification.open({
      message: 'Wish list updated!',
      duration: 2,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
  }

  return (
    <>
      <Card className="course-card" style={{ borderColor: 'black', borderRadius: '1rem' }}>
        <Row>
          <Col className="card-title">
            <h1 onClick={() => setVisible(true)}> {content.title}</h1>
          </Col>
          <Col>
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
            <p>
              <Space direction="horizontal">
                {content.tags.map((tag) => (
                  <div className="emphasised-item">{tag}</div>
                ))}
              </Space>
            </p>
            <p>{content.price}</p>
            <p>{content.location.city}</p>
            <p>something</p>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Course 1"
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
          <Col className="card-image" span={6}>
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
          <Col span={14}>
            <p>Tags: GetFit</p>
            <p>Price: £50.00</p>
            <p>Location: England</p>
            <p>Creators: One two three</p>
            <p>
              Description:
              11CGMEi42cQxgyQcn4zAGMVHFK3vKrnk111CGMEi42cQxgyQcn4zAGMVHFK3vKrnk111CGMEi42cQxgyQcn4zAGMVHFK3vKrnk111CGMEi42cQxgyQcn4zAGMVHFK3vKrnk111CGMEi42cQxgyQcn4zAGMVHFK3vKrnk1111111111111
            </p>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default CourseCard;
