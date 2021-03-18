import { Card, Row, Col, Avatar } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ChatList from '../components/ChatList';
import Conversation from '../components/Conversation';

const Chats = () => {
  const [conversation, setConversation] = useState(null);
  return (
    <Row className="chat-row" justify="center" type="flex">
      <Card
        className="chat-card"
        bordered={false}
        title={
          <div className="header">
            {conversation ? (
              <>
                <LeftOutlined onClick={() => setConversation(null)} />
                <div className="details">
                  <Avatar icon={<UserOutlined />} size="large" />
                  <h3>online</h3>
                </div>
              </>
            ) : (
              <h1>Contact list</h1>
            )}
          </div>
        }
      >
        <Col className="content-chat">
          {conversation ? <Conversation conversation={conversation} /> : <ChatList setConversation={setConversation} />}
        </Col>
        <Col />
      </Card>
    </Row>
  );
};
export default Chats;
