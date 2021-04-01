import { Button, Form, Card, Col, Modal, Typography, Carousel, Steps, Input, Radio } from 'antd';
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
const radioStyle = {
  display: 'block',
  height: '2rem',
  lineHeight: '2rem',
};

const SearchCard = ({ category }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const ref = useRef();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchTarget, setSearchTarget] = useState(null);
  const onFinish = useCallback((values) => {}, []);
  const closePopup = useCallback(() => {
    setVisible(false);
    setCurrent(1);
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
    setCurrent(1);
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
          current < 3 ? (
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
          {[0, 1, 2, 3].map((item) => (
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
                onChange={(e) => {
                  setIsEmpty(false);
                  setSearchTarget(e.target.value);
                }}
              >
                <Radio style={radioStyle} value={1}>
                  People
                </Radio>
                <Radio style={radioStyle} value={2}>
                  Packages
                </Radio>
              </Radio.Group>
            </Form.Item>
            {searchTarget === 2 && (
              <Form.Item
                label={<h3 style={{ fontWeight: 'bold' }}>Are you looking for gym based?</h3>}
                name="gym"
                rules={[{ required: true }]}
              >
                <Radio.Group onChange={() => setIsEmpty(false)}>
                  <Radio style={radioStyle} value={1}>
                    yes
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    no
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {searchTarget === 2 && (
              <Form.Item
                label={<h3 style={{ fontWeight: 'bold' }}>Are you looking for virtual package?</h3>}
                name="virtual"
                rules={[{ required: true }]}
              >
                <Radio.Group onChange={() => setIsEmpty(false)}>
                  <Radio style={radioStyle} value={1}>
                    yes
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    no
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
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
