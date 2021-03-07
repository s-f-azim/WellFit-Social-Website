import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row, Card, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

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
    const initialList = [p1, p2];
    const [list, setList] = useState(initialList);
    
    const handleRemove = (id) => { //removes suggested instructor
      setList(list.filter((item) => item._id !== id));
    };

    const Suggestion = (props) => { //Suggested instructor element
      return (
        <Card 
            type ="inner"
            style={{width :300}}
            actions={[
                <CloseOutlined key="close" onClick={() => handleRemove(props.user._id)}/> 
            ]}
        >
            <Meta
                title={props.user.name}
                description={props.user.followers}
            />
        </Card>
      );
    };
    
    return (
      <Card title="Suggested Instructors">
        <Space direction="vertical" size="middle">
            {list.map((item) =>
              <Suggestion key={item._id} user={item} />)}
        </Space>
      </Card>
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
