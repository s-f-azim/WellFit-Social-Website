<<<<<<< HEAD:frontend/components/userComponents/reviewComponents/ReviewInput.jsx
import { Card, Form, Rate, Input, Button } from 'antd';
import { createReview } from '../../../actions/review';
=======
import { Form, Rate, Input, Button } from 'antd';
>>>>>>> main:frontend/components/ReviewInput.jsx

const ReviewInput = ({ onSubmit }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="rate" rules={[{ required: true, message: 'Please input a rating!' }]}>
        <Rate allowHalf allowClear />
      </Form.Item>

      <Form.Item name="comment">
        <Input.TextArea rows={4} maxLength={200} allowClear showCount />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Leave a Review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewInput;
