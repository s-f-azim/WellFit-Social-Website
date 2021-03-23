import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const PostInput = ({ onSubmit }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="content" rules={[{ required: true, message: 'Please input some content' }]}>
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} maxLength={200} allowClear />
      </Form.Item>

      <Form.Item name="videoUrl">
        <Input placeholder="Video URL..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
      </Form.Item>
    </Form>
  );
};

export default PostInput;
