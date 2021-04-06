/* eslint-disable no-underscore-dangle */
import { List, Spin, Avatar, Tabs } from 'antd';
import { UserOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useSession } from 'next-auth/client';
import { getFollowingList } from '../../../actions/user';
import { createConversation, getConversation } from '../../../actions/conversation';

const loadingIcon = <LoadingOutlined spin />;
const ChatList = ({ setConversation, setReciver }) => {
  const [users, setUsers] = useState([]);
  const [session] = useSession();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastMsgs, setLastMsgs] = useState({});
  let totalUsers;
  useEffect(async () => {
    try {
      const response = await getFollowingList(session.user._id);

      totalUsers = response.data.pagination.total;
      setUsers([...response.data.data]);
    } catch (err) {
      console.log(err);
    }
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
  const handleScroll = async (params, total) => {
    setLoading(true);
    if (users.length >= total) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    const response = await getFollowingList(session.user._id, params);
    setUsers([...response.data.data]);
    setLoading(false);
  };
  // handle the click of the conversation or user
  const handleClick = async (user) => {
    setReciver(user);
    const response = await getConversation(user._id);
    if (response.data.success) {
      // if conversation exists return that
      if (response.data.data) {
        setConversation({ ...response.data.data });
      } else {
        // otherwise make a new conversation
        const newConversation = await createConversation(user._id);
        setConversation(newConversation.data.data);
      }
    }
  };
  const addMsg = async (id) => {
    const res = await getConversation(id);
    const msg =
      res.data.data && res.data.data.messages.length > 0
        ? res.data.data.messages.slice(-1)[0].content
        : '';

    setLastMsgs({ [id]: msg, ...lastMsgs });
  };
  const removeMsg = (id) => {
    delete lastMsgs[id];
    setLastMsgs({ ...lastMsgs });
  };

  return (
    <>
      <Tabs defaultActiveKey="1" centered="true">
        <Tabs.TabPane tab="Following" key="1">
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
                renderItem={(item) => {
                  if (item && item._id !== session.user._id) {
                    return (
                      <List.Item
                        className="user"
                        key={item._id}
                        onClick={() => handleClick(item)}
                        onMouseEnter={() => addMsg(item._id)}
                        onMouseLeave={() => removeMsg(item._id)}
                      >
                        <List.Item.Meta
                          avatar={image(item)}
                          title={item.fName}
                          description={lastMsgs[item._id] ? lastMsgs[item._id] : item.email}
                        />
                        <div className="action">
                          <SendOutlined />
                        </div>
                      </List.Item>
                    );
                  }
                }}
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
