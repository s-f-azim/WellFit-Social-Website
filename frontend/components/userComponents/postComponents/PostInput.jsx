import { Form, Input, Button, Card, notification } from 'antd';
import { SendOutlined, CheckOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player/lazy';

const PostInput = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
    notification.open({
      message: 'Post published!',
      duration: 3,
      icon: <CheckOutlined style={{ color: '#33FF49' }} />,
    });
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
            aria-label="content"
            placeholder="Share some thoughts"
            autoSize={{ minRows: 2, maxRows: 4 }}
            maxLength={200}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="videoUrl"
          rules={[
            {
              validator: async (_, url) => {
                if (!url || ReactPlayer.canPlay(url)) return Promise.resolve();
                return Promise.reject('Unsupported video url entered');
              },
            },
          ]}
        >
          <Input aria-label="videoUrl" placeholder="add a Video URL" />
        </Form.Item>

        <Button
          aria-label="post"
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: '#ffeee6', border: '1px solid #ffa277' }}
          icon={<SendOutlined />}
          block
        />
      </Form>
    </Card>
  );
};

export default PostInput;
