/* eslint-disable no-underscore-dangle */
import { List, Rate, Button, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ReviewList = ({ reviews, renderItem, loading }) => (
  <List
    header={<Typography.Title level={2}>Reviews</Typography.Title>}
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 5,
    }}
    dataSource={reviews}
    renderItem={renderItem}
    loading={loading}
  />
);

ReviewList.Item = ({ review, onDelete }) => {
  const DeleteButton = () => (
    <Popconfirm title="Are you sure?" onConfirm={onDelete} okText="Yes" cancelText="No">
      <Button aria-label="delete" type="danger" icon={<DeleteOutlined />} />
    </Popconfirm>
  );

  return (
    <List.Item
      aria-label="review"
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
