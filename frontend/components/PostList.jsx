/* eslint-disable no-underscore-dangle */
import { List, Button, Popconfirm, Typography, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Moment from 'react-moment';
import VideoPlayer from './VideoPlayer';

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

PostList.Item = ({ post, onDelete }) => {
  const DeleteButton = ({ id }) => (
    <Popconfirm title="Are you sure?" onConfirm={() => onDelete(id)} okText="Yes" cancelText="No">
      <Button type="text" icon={<DeleteOutlined />} danger />
    </Popconfirm>
  );

  return (
    <List.Item key={post._id} actions={[onDelete && <DeleteButton id={post._id} />]}>
      <List.Item.Meta
        title={<Title level={4}>{`${post.author.fName} ${post.author.lName}`}</Title>}
        description={<Moment date={post.createdAt} fromNow />}
      />
      <Paragraph>{post.content}</Paragraph>
      {post.videoUrl && <VideoPlayer url={post.videoUrl} />}
    </List.Item>
  );
};

export default PostList;
