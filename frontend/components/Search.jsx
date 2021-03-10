import { Button, Form, Row, Card, Col, Modal, Typography, Carousel, Steps, Input } from 'antd';
import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';

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
  const ref = useRef();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const onFinish = useCallback((values) => {
    console.log('hmm', values);
  }, []);
  const closePopup = useCallback(() => {
    form.resetFields();
    setCurrent(0);
    setVisible(false);
  }, [form]);
  const next = () => {
    setCurrent(current + 1);
    ref.current.next();
  };
  const previous = () => {
    setCurrent(current - 1);
    ref.current.prev();
  };
  const handleOk = () => {
    setVisible(false);
    form.submit();
  };
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
        title={category.name}
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={closePopup}
        width={1000}
        footer={[
          <Button key="previous" onClick={previous} disabled={current === -2}>
            Previous
          </Button>,
          current !== 5 ? (
            <Button key="next" type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button key="submit" type="primary" onClick={handleOk}>
              Search
            </Button>
          ),
        ]}
      >
        <Steps current={current}>
          {[0, 1, 2, 3, 4].map((item) => (
            <Steps.Step key={item} />
          ))}
        </Steps>
        <Form
          style={{ marginTop: '2rem' }}
          id="searchForm"
          {...formItemLayout}
          form={form}
          name="search"
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item label="name">
            <Input />
          </Form.Item>
          <Carousel ref={ref} dots={false}>
            <Form.Item label="name">
              <Input />
            </Form.Item>
            <Form.Item label="another">
              <Input />
            </Form.Item>
          </Carousel>
        </Form>
      </Modal>
    </>
  );
};
export default SearchCard;
