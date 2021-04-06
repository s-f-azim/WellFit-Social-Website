import { Card, Row, Col, Avatar } from 'antd';
import { UserOutlined, LeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSession, getSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';
import ChatList from '../components/userComponents/chatComponents/ChatList';
import Conversation from '../components/userComponents/chatComponents/Conversation';
import AccessDenied from '../components/generalComponents/AccessDenied';

const Chats = () => {
  const [session, loading] = useSession();
  const [conversation, setConversation] = useState(null);
  const [receiver, setReciver] = useState(null);
  if (typeof window !== 'undefined' && loading) return null;
  if (session && session.user) {
    return (
      <>
        <NextSeo
          title="Chats Page"
          description="A page from which a user can access chats and chat with mutual followers."
        />
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
                      <h3>{receiver ? receiver.fName : ''}</h3>
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
                <Conversation conversation={conversation} receiver={receiver} />
              ) : (
                <ChatList setReciver={setReciver} setConversation={setConversation} />
              )}
            </Col>
            <Col />
          </Card>
        </Row>
      </>
    );
  }
  return <AccessDenied />;
};
export default Chats;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
