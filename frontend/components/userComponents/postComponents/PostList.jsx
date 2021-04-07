/* eslint-disable no-underscore-dangle */
import { List, Button, Popconfirm, Typography, Card, Avatar } from 'antd';
import { DeleteOutlined, HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import VideoPlayer from '../../generalComponents/VideoPlayer';

const { Title, Paragraph } = Typography;

const PostList = ({ posts, renderItem, loading }) => (
  <Card>
    <List
      itemLayout="vertical"
      size="large"
      dataSource={posts}
      renderItem={renderItem}
      loading={loading}
    />
  </Card>
);

PostList.Item = ({ post, onDelete, onLike, isLiked }) => {
  const LikedButton = ({ id }) => (
    <Button
      aria-label="like"
      type="text"
      onClick={() => onLike(id)}
      icon={<HeartFilled />}
      danger
    />
  );

  const NotLikedButton = ({ id }) => (
    <Button
      aria-label="like"
      type="text"
      onClick={() => onLike(id)}
      icon={<HeartOutlined />}
      danger
    />
  );

  const DeleteButton = ({ id }) => (
    <Popconfirm title="Are you sure?" onConfirm={() => onDelete(id)} okText="Yes" cancelText="No">
      <Button aria-label="delete" type="text" icon={<DeleteOutlined />} danger />
    </Popconfirm>
  );

  return (
    <List.Item
      aria-label="post"
      key={post._id}
      actions={[
        ...(onLike
          ? isLiked
            ? [<LikedButton id={post._id} />]
            : [<NotLikedButton id={post._id} />]
          : []),
        ...(onDelete ? [<DeleteButton id={post._id} />] : []),
      ]}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={
              post.author.photos[0] ? (
                `data:image/png;base64,${post.author.photos[0].toString('base64')}`
              ) : (
                <UserOutlined />
              )
            }
          />
        }
        title={
          <div>
            <Title level={4}>
              {post.author.fName} {post.author.lName}
            </Title>
          </div>
        }
        description={<Moment date={post.createdAt} fromNow />}
      />
      <Paragraph>{post.content}</Paragraph>
      {post.videoUrl && <VideoPlayer url={post.videoUrl} />}
    </List.Item>
  );
};

export default PostList;
