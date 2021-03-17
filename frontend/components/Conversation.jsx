import { Avatar, Form, Input, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
const layout = {
  wrapperCol: { xs: { span: 24 }, sm: { span: 100 }, md: { span: 200 }, lg: { span: 300 } },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 12 },
    md: { span: 12, offset: 8 },
    lg: { span: 12, offset: 8 },
  },
};
const msgs = [
  { author: 'me', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
  { author: 'me', message: 'something very interesting' },
  { author: 'you', message: 'something very interesting' },
];

const ChatBubble = ({ incoming }) => {
  return (
    <div className={`chat-bubble ${incoming ? 'outgoing' : 'incoming'}`}>
      <div className={incoming ? 'outgoing' : 'incoming'}>
        <p>long ass text here i like to do things and run around </p>
      </div>
    </div>
  );
};

const Conversation = () => {
  const [form] = Form.useForm();
  return (
    <>
      <div className="chat-box">
        {msgs.map((msg) => (
          <ChatBubble incoming={msg.author !== 'me'} />
        ))}
        <Form
          {...layout}
          className="typing-area"
          style={{ width: '100%', marginTop: '0.9rem' }}
          layout="inline"
          form={form}
          scrollToFirstError
        >
          <Form.Item
            style={{ width: '70%' }}
            rules={[{ required: true, message: 'Please write a message' }]}
          >
            <Input
              style={{ textAlign: 'center', borderRadius: '2000rem' }}
              placeholder="Type a message here"
            />
          </Form.Item>
          <Button type="primary" shape="round" htmlType="submit">
            <SendOutlined />
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Conversation;
