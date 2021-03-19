/* eslint-disable no-underscore-dangle */
import {  List, Spin, Avatar, Tabs } from 'antd';
import { UserOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import api from '../services/api';

const loadingIcon = <LoadingOutlined spin />;
const ChatList = ({ setConversation }) => {
  const [users, setUsers] = useState([]);
  const [conversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let totalUsers;
  useEffect(async () => {
    const response = await api.get('/users');
    const res = await api.get('/conversation/me');
    totalUsers = response.data.pagination.total;
    setUsers([...response.data.data]);
  }, []);
  // load images of users
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
  // handle the infinite scroll
  const handleScroll = async (params, total, type) => {
    let response;
    console.log('hmm');
    setLoading(true);
    if (users.length >= total) {
      setLoading(false);
      setHasMore(false);
      return;
    }
    if (type === 'users') {
      response = await api.get(`/users?limit=${params}`);
    } else {
      response = await api.get(`/conversation/me?limit=${params}`);
    }
    setUsers([...response.data.data]);
    setLoading(false);
  };
  // handle the click of the conversation or user
  const handleClick = async (userId) => {
    try {
      const usersIds = [userId];
      const response = await api.get(`/conversation/${usersIds.join(',')}`);
      console.log(response);
      if (response.data.success) {
        // if conversation exists return that
        if (response.data.data) {
          setConversation({ ...response.data.data });
        } else {
          // otherwise make a new conversation
          const newConversation = await api.post('/conversation', { users: [userId] });
          setConversation(newConversation.data.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="1" centered="true">
        <Tabs.TabPane tab="Following/followers" key="1">
    <div className="infinite-container">
    <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={() => handleScroll(users.length + 2, totalUsers, 'user')}
              hasMore={!loading && hasMore}
              useWindow={false}
            >
              <List
                dataSource={users}
                renderItem={(item) => (
                  <List.Item className="user" key={item._id} onClick={() => handleClick(item._id)}>
                    <List.Item.Meta
                      avatar={image(item)}
                      title={item.fName}
                      description={item.email}
                    />
                    <div className="action">
                      <SendOutlined />
                    </div>
                  </List.Item>
                )}
              >
                {loading && hasMore && (
                  <div className="loading-container">
                    <Spin indicator={loadingIcon} />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default ChatList;
