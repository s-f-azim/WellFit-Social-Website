import { Card, Row, Col, Avatar } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ChatList from '../components/ChatList';
import Conversation from '../components/Conversation';
import { useSession, getSession } from 'next-auth/client';

const Chats = () => {
  const [session, loading] = useSession();
  const [conversation, setConversation] = useState(null);
  if (typeof window !== 'undefined' && loading) return null;
  if (session) {
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
                  </div>
                </>
              ) : (
                <h1>Contact list</h1>
              )}
            </div>
          }
        >
          <Col className="content-chat">
            {conversation ? (
              <Conversation conversation={conversation} />
            ) : (
              <ChatList setConversation={setConversation} />
            )}
          </Col>
          <Col />
        </Card>
      </Row>
    );
  } else {
    return <div>access denied </div>;
  }
};
export default Chats;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
