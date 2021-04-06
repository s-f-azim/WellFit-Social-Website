import { Button, Form, Card, Col, Modal, Typography, Carousel, Steps, Input, Radio } from 'antd';
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
const radioStyle = {
  display: 'block',
  height: '2rem',
  lineHeight: '2rem',
};

const SearchCard = ({ setQuery, category }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const ref = useRef();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const onFinish = useCallback((values) => {
    setQuery({ values, category });
    setCurrent(0);
    form.resetFields();
  }, []);
  const closePopup = useCallback(() => {
    setVisible(false);
    setCurrent(0);
    setIsEmpty(true);
    form.resetFields();
  }, [form]);
  const next = () => {
    setCurrent(current + 1);
    setIsEmpty(true);
    ref.current.next();
  };
  const previous = () => {
    setCurrent(current - 1);
    setIsEmpty(false);
    ref.current.prev();
  };
  const handleOk = () => {
    setVisible(false);
    setCurrent(0);
    form.submit();
  };
  return (
    <>
      <Col>
        <Card
          onClick={() => setVisible(true)}
          title={
            <Typography.Title className="title" style={{ textAlign: 'center' }}>
              {category.name}
            </Typography.Title>
          }
          style={{
            width: 400,
            height: 350,
            borderColor: '#ffa277',
            borderRadius: '0.5rem',
            background: '#ffeee6',
            margin: '1em',
            padding: '1em',
          }}
          cover={category.photo}
        />
      </Col>
      <Modal
        style={{ fontSize: '2rem', fontWeight: 'bold' }}
        className="search-popup"
        title={<h2 style={{ textAlign: 'center' }}>{category.name}</h2>}
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={closePopup}
        width={1000}
        footer={[
          <Button key="previous" onClick={previous} disabled={current === 0}>
            Previous
          </Button>,
          current < 1 ? (
            <Button key="next" type="primary" onClick={next} disabled={isEmpty}>
              Next
            </Button>
          ) : (
            <Button key="submit" type="primary" onClick={handleOk} disabled={isEmpty}>
              Search
            </Button>
          ),
        ]}
      >
        <Steps current={current}>
          {[0, 1].map((item) => (
            <Steps.Step key={item} />
          ))}
        </Steps>
        <Form
          id="searchForm"
          style={{ width: '100%' }}
          {...formItemLayout}
          form={form}
          name="search"
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Carousel ref={ref} dots={false} style={{ padding: '2rem' }}>
            <Form.Item
              label={<h3 style={{ fontWeight: 'bold' }}>Searching for people or packages?</h3>}
              name="type"
              rules={[{ required: true }]}
            >
              <Radio.Group
                onChange={() => {
                  setIsEmpty(false);
                }}
              >
                <Radio style={radioStyle} value="users">
                  People
                </Radio>
                <Radio style={radioStyle} value="courses">
                  Packages
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={<h3 style={{ fontWeight: 'bold' }}>Please enter your address (zipcode)</h3>}
              name="location"
              rules={[{ required: true }]}
            >
              <Input onChange={() => setIsEmpty(false)} />
            </Form.Item>
          </Carousel>
        </Form>
      </Modal>
    </>
  );
};
export default SearchCard;
