/* eslint-disable no-underscore-dangle */
import { List, Button, Popconfirm, Typography, Avatar } from 'antd';
import { DeleteOutlined, FileDoneOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';

const ReviewList = ({ reviews, renderItem, loading }) => (
  <List
    header={
      <Typography.Title level={2}>
        Reviews <FileDoneOutlined />
      </Typography.Title>
    }
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

  const extraStuff = (
    <div>
      Rating: {review.rate}/5 <StarOutlined />
    </div>
  );

  return (
    <List.Item aria-label="review" key={review._id} actions={[onDelete && <DeleteButton />]}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={
              review.author.photos[0] ? (
                `data:image/png;base64,${review.author.photos[0].toString('base64')}`
              ) : (
                <UserOutlined />
              )
            }
          />
        }
        title={
          <div>
            <strong>Author:</strong> {review.author.fName} {review.author.lName}
          </div>
        }
      />
      <div style={{ minwidth: '30%' }}>
        <strong>{extraStuff}</strong>
        <br />
        {review.comment}
      </div>
    </List.Item>
  );
};

export default ReviewList;
