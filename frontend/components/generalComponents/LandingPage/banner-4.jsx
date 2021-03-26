import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { MessageOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { getTrendingUsersLimit } from '../../../actions/user';

const { Meta } = Card;

const Banner4 = () => {
  // List of suggested instructors
  const [showState, setShowState] = useState(false);
  const [list, setList] = useState({});
  const suggestionsDisplayed = list.length;
  // Fetches suggested instructors once after initial render
  useEffect(async () => {
    try {
      const response = await getTrendingUsersLimit(3);
      if (response.data.success && response.data.data.length !== 0) {
        setList(response.data.data);
        setShowState(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="banner4">
      <div className="inner_banner4">
        <h1>Explore leading instructors </h1>

        {showState ? (
          <div className="banner4_boxes">
            {list.map((item) => (
              <div className="instructorCard">
                <Card
                  cover={
                    <img
                      alt="example"
                      src={
                        item.photos[0] ? item.photos[0] : '/alex-suprun-ZHvM3XIOHoE-unsplash-2.jpg'
                      }
                    />
                  }
                  actions={[<UserOutlined />, <UserAddOutlined />, <MessageOutlined />]}
                >
                  <Meta
                    title={item.screenname ? item.screenname : `${item.fName} ${item.lName}`}
                    description={item.bio ? item.bio : null}
                  />
                </Card>
              </div>
            ))}
          </div>
        ) : (
          'Doesnt work'
        )}
      </div>
    </div>
  );
};
export default Banner4;
