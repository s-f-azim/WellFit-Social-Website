import { Form, Rate, Input, Button } from 'antd';

const ReviewInput = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="rate" rules={[{ required: true, message: 'Please input a rating!' }]}>
        <Rate aria-label="rate" allowHalf allowClear />
      </Form.Item>

      <Form.Item name="comment">
        <Input.TextArea aria-label="comment" rows={4} maxLength={200} allowClear showCount />
      </Form.Item>

      <Form.Item>
        <Button aria-label="review" type="primary" htmlType="submit">
          Leave a Review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewInput;
