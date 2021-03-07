import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { Space, Button, Row, Card, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Animate from 'rc-animate';
import { getSuggestedInstructors } from '../actions/user.js';


const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  // redirect to home page if user not logged in
  useEffect(() => {
    if (!user) router.push('/');
  }, []);

  const { Meta } = Card;
  
  const Suggestions = () => { //List of suggested instructors
    const [showState, setShowState] = useState(false);
    const [list, setList] = useState({});
    var suggestionsDisplayed = list.length;
    //Fetches suggested instructors once after initial render
    useEffect( async () => {
      try {
        const response = await getSuggestedInstructors();
        if (response.data.success && response.data.data.length !== 0) {
          setList(response.data.data);
          setShowState(true);
        }
      } catch (error) {
        console.log(error)
      }
    }, []);


    const handleRemove = () => { //Handles removing suggestions box
      if (--suggestionsDisplayed === 0) setShowState(false);
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
                      setShowState(false); //remove individual suggestion
                      handleRemove();
                      }}
                    /> 
              ]}
            >
              <Meta
                  title={props.user.name}
                  description={props.user.email}
              />
            </Card> : null }

          
          

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
