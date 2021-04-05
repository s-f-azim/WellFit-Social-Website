/* eslint-disable no-underscore-dangle */
import { Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import io from 'socket.io-client';
import { SOCKET_URL } from '../../../config';

let socket;
const layout = {
  wrapperCol: { xs: { span: 24 }, sm: { span: 100 }, md: { span: 200 }, lg: { span: 300 } },
};

const ChatBubble = ({ incoming, content }) => (
  <div className={`chat-bubble ${incoming ? 'outgoing' : 'incoming'}`}>
    <div className={incoming ? 'outgoing' : 'incoming'}>
      <p>{content}</p>
    </div>
  </div>
);
const Conversation = ({ conversation }) => {
  const [msgs, setMsgs] = useState(
    conversation && conversation.messages ? conversation.messages : []
  );
  const [form] = Form.useForm();
  const [session] = useSession();
  // scroll to the bottom
  const scrollToBottom = () => {
    animateScroll.scrollToBottom({ containerId: 'chat-bubbles', duration: 50 });
  };

  // connect to a socket on load
  useEffect(() => {
    scrollToBottom();
    socket = io(SOCKET_URL, { withCreddentials: true });
    return () => {
      socket.off();
    };
  }, []);

  // check for new messages and update the state
  useEffect(() => {
    socket.on('message', (message) => {
      if (conversation.users.includes(message.author)) setMsgs([...msgs, message]);
    });
    scrollToBottom();
  }, [msgs]);
  // send a new message
  const sendMsg = (values) => {
    socket.emit('Send message', {
      author: session.user._id,
      conversationId: conversation._id,
      message: values.message,
    });
    form.resetFields();
  };
  return (
    <>
      <div id="chat-bubbles" className="chat-box" style={{ height: '60vh' }}>
        {msgs.map((msg) => (
          <ChatBubble
            key={msg._id}
            content={msg.content}
            incoming={msg.author !== session.user._id}
          />
        ))}
      </div>
      <Form
        {...layout}
        className="typing-area"
        style={{ width: '100%', marginTop: '0.9rem' }}
        layout="inline"
        form={form}
        onFinish={sendMsg}
        scrollToFirstError
      >
        <Form.Item
          name="message"
          style={{ width: '70%' }}
          rules={[{ required: true, message: 'Please add a message' }]}
        >
          <Input
            aria-label="message"
            style={{ textAlign: 'center', borderRadius: '2000rem' }}
            placeholder="Enter your message..."
          />
        </Form.Item>
        <Form.Item>
          <Button
            aria-label="send"
            type="text"
            htmlType="submit"
            style={{ border: '1px solid #dddddd' }}
          >
            <SendOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Conversation;
