import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row, Card, Col } from 'antd';
import Suggestions from '../components/SuggestedInstructors'


const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

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
};

export default Profile;
