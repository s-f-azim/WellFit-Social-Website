import Router from 'next/router';
import { useState, useEffect } from 'react';
import { Space, Button, Row, Card, Col } from 'antd';
import { useSession, getSession } from 'next-auth/client';
import Suggestions from '../components/SuggestedInstructors';

const Profile = () => {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) return null;

  if (session) {
    return (
      <div>
        <Row>
          <Col push="10">
            <Row type="flex" align="top" justify="center" align="middle">
              <Space
                direction="horizontal"
                size="large"
                style={{ border: 'solid', borderWidth: '0.1rem', borderRadius: '1rem' }}
              >
                <Button type="link" size="large">
                  Favourites
                </Button>
                <Button type="link" size="large">
                  Following
                </Button>
                <Button type="link" size="large">
                  Wish List
                </Button>
              </Space>
            </Row>
          </Col>

          <Col push="14">
            <Suggestions />
          </Col>
        </Row>
      </div>
    );
  }
  return <p>Access Denied</p>;
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default Profile;
