import { Card, Form, Rate, Input, Button } from 'antd';
import { createReview } from '../utils/review';

const { TextArea } = Input;

const ReviewInput = ({ reviewedId }) => {
  const onFinish = async (values) => {
    await createReview(reviewedId, values);
  };

  return (
    <>
      <Card>
        <Form onFinish={onFinish}>
          <Form.Item name="rate" rules={[{ required: true, message: 'Please input a rating!' }]}>
            <Rate allowHalf allowClear />
          </Form.Item>

          <Form.Item name="comment">
            <TextArea rows={4} maxLength={200} allowClear showCount />
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
