import { Card, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ChatList from '../components/ChatList';

const Chats = () => {
  const [conversation, setConversation] = useState();
  return (
    <Row justify="center" type="flex">
      <Card
        className="chat-card"
        bordered={false}
        title={
          <div className="header">
            <Avatar icon={<UserOutlined />} size="large" />
          </div>
        }
      >
        <Col>
          <ChatList />
        </Col>
        <Col></Col>
      </Card>
    </Row>
  );
};
export default Chats;
