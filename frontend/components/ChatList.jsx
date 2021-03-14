import { Input, List, message, Avatar } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getUsers } from '../actions/user';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const ChatList = () => {
  const [users, setUsers] = useState();
  // let users;
  useEffect(async () => {
    const response = await getUsers();
    console.log(response.data);
    setUsers([...response.data.data]);
  }, []);
  const image = (user) => {
    if (user.photos[0]) {
      return (
        <Avatar
          src={`data:image/png;base64,${Buffer.from(user.photos[0].data).toString('base64')}`}
        />
      );
    }
    return <Avatar icon={<UserOutlined />} />;
  };
  return (
    <>
      <Input style={{ borderRadius: '10000rem' }} />
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item className="user" key={item._id}>
            <List.Item.Meta
              avatar={image(item)}
              title={<a href="https://ant.design">{item.fName}</a>}
              description={item.email}
            />
            <div className="action">
              <SendOutlined />
            </div>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default ChatList;
