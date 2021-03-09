import { Card, Row, Col, Modal, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';

const CustomCard = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card onClick={() => setVisible(true)} style={{ borderColor: 'black', borderRadius: '1rem' }}>
        <Row>
          <Col className="card-title">
            <h1>Course 1</h1>
          </Col>
          <Col>
            <DeleteOutlined style={{ fontSize: '2rem', color: 'black' }} />
          </Col>
        </Row>

        <br />

        <Row style={{ maxHeight: '15rem' }}>
          <Col className="card-image">
            <Image src="/jogging.svg" height={100} width={100} layout="responsive" />
          </Col>
          <Col>
            <p>
              Tags:{' '}
              <Space direction="horizontal">
                <div className="emphasised-item">GetFit</div>
                <div className="emphasised-item">FitnessMotivation</div>
              </Space>
            </p>
            <p>Price: £50.00</p>
            <p>Location: England</p>
            <p>Creators: One two three</p>
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
      >
        <Row justify="center" align="middle">
          <Col className="card-image" span={6}>
            <Image src="/jogging.svg" height={300} width={300} layout="responsive" />
          </Col>
          <Col span={14}>
            <p>Tags: GetFit</p>
            <p>Price: £50.00</p>
            <p>Location: England</p>
            <p>Creators: One two three</p>
            <p>
              Description:
              11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
            </p>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CustomCard;
