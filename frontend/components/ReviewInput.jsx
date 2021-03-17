import { Card, Form, Rate, Input, Button } from 'antd';

const ReviewInput = ({ onSubmit }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <>
      <Card>
        <Form onFinish={onFinish}>
          <Form.Item name="rate" rules={[{ required: true, message: 'Please input a rating!' }]}>
            <Rate allowHalf allowClear />
          </Form.Item>

          <Form.Item name="comment">
            <Input.TextArea rows={4} maxLength={200} allowClear showCount />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Review
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ReviewInput;
