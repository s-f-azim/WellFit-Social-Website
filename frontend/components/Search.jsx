import { Button, Form, Row, Card, Col, Modal, Typography, Carousel, Steps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const SearchCard = ({ category }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent(current + 1);
  const previous = () => setCurrent(current - 1);
  return (
    <>
      <Col>
        <Card
          onClick={() => setVisible(true)}
          title={
            <Typography.Title style={{ textAlign: 'center' }}>{category.name}</Typography.Title>
          }
          style={{ width: 450, height: 450 }}
          cover={<Image src={category.photo} height={450} width={450} objectFit="contain" />}
        ></Card>
      </Col>
      <Modal
        title="Course 1"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Steps current={current}>
          {[0, 1, 2, 3, 4].map((item) => (
            <Steps.Step key={item} />
          ))}
        </Steps>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        ></Form>
      </Modal>
    </>
  );
};
export default SearchCard;
