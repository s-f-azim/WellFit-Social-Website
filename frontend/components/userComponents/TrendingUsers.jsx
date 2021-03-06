import { useState, useEffect } from 'react';
import { Card, List, Avatar, Descriptions } from 'antd';
import { UserOutlined, BarChartOutlined, RiseOutlined } from '@ant-design/icons';
import { getTrendingUsers } from '../../actions/user';

const { Item } = List;
const { Meta } = Item;

const TrendingUsers = () => {
  // Card of list of trending users in db

  const [showState, setShowState] = useState(false);
  const [data, setData] = useState([]);

  useEffect(async () => {
    const response = await getTrendingUsers();
    setData(response.data.data);
    if (data.length > 0) setShowState(true);
  });

  let rank = 1;
  return (
    <div>
      {showState ? (
        <Card
          title={
            <div style={{ display: 'flex', paddingBottom: 0 }}>
              <h3>
                <strong>
                  Trending Users <RiseOutlined style={{ fontSize: '24px', paddingRight: 4 }} />
                </strong>
              </h3>
            </div>
          }
          style={{ width: 350 }}
          bodyStyle={{ padding: 0, paddingLeft: 10, paddingRight: 0 }}
        >
          <List
            style={{ marginTop: 0, overflow: 'auto', height: 'auto', maxHeight: 400 }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(user) => (
              <Item>
                <Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`#${(rank++).toString()} ${user.fName} ${user.lName}`}
                  description={
                    <Descriptions.Item>
                      {`Followers: ${user.follower.length}`} <br />
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Descriptions.Item>
                  }
                />
              </Item>
            )}
          />
        </Card>
      ) : null}
    </div>
  );
};

export default TrendingUsers;
