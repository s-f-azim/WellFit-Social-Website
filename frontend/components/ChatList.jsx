import { Input, List, Spin, Avatar } from 'antd';
import { UserOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import api from '../services/api';

const loadingIcon = <LoadingOutlined spin />;
const ChatList = ({ setConversation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  let total;
  useEffect(async () => {
    const response = await api.get('/users');
    total = response.data.pagination.total;
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
  const handleScroll = async (params) => {
    console.log('hmm');
    setLoading(true);
    if (users.length >= total) {
      setLoading(false);
      setHasMore(false);
      return;
    }
    const response = await api.get(`/users?limit=${params}`);
    setUsers([...response.data.data]);
    setLoading(false);
  };

  return (
    <>
      <Input style={{ borderRadius: '10000rem' }} />
      <div className="infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={() => handleScroll(users.length + 2)}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={users}
            renderItem={(item) => (
              <List.Item className="user" key={item._id} onClick={() => setConversation(true)}>
                <List.Item.Meta avatar={image(item)} title={item.fName} description={item.email} />
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
    </>
  );
};

export default ChatList;
