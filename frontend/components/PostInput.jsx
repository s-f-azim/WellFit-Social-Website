import { Form, Input, Button, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const PostInput = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[{ required: true, message: 'Please input some content' }]}
        >
          <Input.TextArea
            placeholder="Share some thoughts"
            autoSize={{ minRows: 2, maxRows: 4 }}
            maxLength={200}
            allowClear
          />
        </Form.Item>

        <Form.Item name="videoUrl">
          <Input placeholder="Video URL" />
        </Form.Item>

        <Button type="primary" htmlType="submit" icon={<SendOutlined />} block />
      </Form>
    </Card>
  );
};

export default PostInput;
