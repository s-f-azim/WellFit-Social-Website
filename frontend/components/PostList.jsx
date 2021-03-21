/* eslint-disable no-underscore-dangle */
import { List, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const PostList = ({ posts, renderItem, loading }) => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={posts}
    renderItem={renderItem}
    loading={loading}
  />
);

PostList.Item = ({ post, onDelete }) => {
  const DeleteButton = ({ id }) => (
    <Popconfirm title="Are you sure?" onConfirm={() => onDelete(id)} okText="Yes" cancelText="No">
      <Button type="danger" icon={<DeleteOutlined />} />
    </Popconfirm>
  );

  return (
    <List.Item key={post._id} actions={[onDelete && <DeleteButton id={post._id} />]}>
      <List.Item.Meta title={`${post.author.fName} ${post.author.lName}`} />
      {post.content}
    </List.Item>
  );
};

export default PostList;
