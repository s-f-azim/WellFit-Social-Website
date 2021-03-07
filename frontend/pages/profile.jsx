import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row, Card, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Animate from 'rc-animate';


const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  const { Meta } = Card;

  const Suggestions = () => { //List of suggested instructors
    //Set up initial list
    const p1 =  {_id: 1, name: "Jon", followers: 10};
    const p2 = {_id: 2, name: "Oi", followers:2400};
    var list = [p1, p2];
    const [showState, setShowState] = useState(true);

    const handleRemove = (id) => { //Handles removing suggestions box
      list = list.filter(item => item._id !== id);
      if (list.length === 0) setShowState(false);
    };

    const Suggestion = (props) => { //Suggested instructor element
      const [showState, setShowState] = useState(true);
      return (
        <Animate transitionName="fade"> 
          {
            showState ? 
            <Card 
              type ="inner"
              style={{width :300}}
              actions={[
                  <CloseOutlined 
                    key="close" 
                    onClick={() => {
                      setShowState(false);
                      handleRemove(props.user._id);
                    }}/> 
              ]}
            >
              <Meta
                  title={props.user.name}
                  description={props.user.followers}
              />
            </Card> : null

          }
          

        </Animate>
        
      );
    };
    
    return (
      <Animate transitionName="fade">
        {
          showState ? 
            <Card title="Suggested Instructors">
              <Space direction="vertical" size="middle">
                  {list.map((item) =>
                    <Suggestion key={item._id} user={item} />)}
              </Space>
            </Card> : null
        }
      </Animate>
      
    );
    
  }

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
