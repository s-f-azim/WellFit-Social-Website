import { Form, Input, Button, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player/lazy';

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
            role="textbox"
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
          <Input role="textbox" aria-label="videoUrl" placeholder="Video URL" />
        </Form.Item>

        <Button
          role="button"
          aria-label="post"
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          block
        />
      </Form>
    </Card>
  );
};

export default PostInput;
