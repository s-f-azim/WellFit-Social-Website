/* eslint-disable no-underscore-dangle */
<<<<<<< HEAD:frontend/components/userComponents/reviewComponents/ReviewList.jsx
import { List, Rate, Button, Menu, Dropdown, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { deleteReview } from '../../../actions/review';
=======
import { List, Rate, Button, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
>>>>>>> main:frontend/components/ReviewList.jsx

const ReviewList = ({ reviews, renderItem, loading }) => (
  <List
    header={<Typography.Title level={2}>Reviews</Typography.Title>}
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 4,
    }}
    dataSource={reviews}
    renderItem={renderItem}
    loading={loading}
  />
);

ReviewList.Item = ({ review, onDelete }) => {
  const DeleteButton = () => (
    <Popconfirm title="Are you sure?" onConfirm={onDelete} okText="Yes" cancelText="No">
      <Button type="danger" icon={<DeleteOutlined />} />
    </Popconfirm>
  );

  return (
    <List.Item
      key={review._id}
      actions={[onDelete && <DeleteButton />]}
      extra={<Rate disabled defaultValue={review.rate} />}
    >
      <List.Item.Meta title={`${review.author.fName} ${review.author.lName}`} />
      {review.comment}
    </List.Item>
  );
};

export default ReviewList;
