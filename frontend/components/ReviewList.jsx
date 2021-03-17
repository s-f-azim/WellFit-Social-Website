/* eslint-disable no-underscore-dangle */
import { List, Rate, Button, Card, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ReviewList = ({ children }) => (
  <>
    <Card>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
      >
        {children}
      </List>
    </Card>
  </>
);

ReviewList.Item = ({ review, onDelete, showMenu }) => {
  const DeleteButton = () => (
    <>
      <Popconfirm title="Are you sure?" onConfirm={onDelete} okText="Yes" cancelText="No">
        <Button type="danger" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );

  return (
    <>
      <List.Item
        key={review._id}
        actions={[showMenu && <DeleteButton />]}
        extra={
          <>
            <Rate disabled defaultValue={review.rate} />
          </>
        }
      >
        <List.Item.Meta title={`${review.author.fName} ${review.author.lName}`} />
        {review.comment}
      </List.Item>
    </>
  );
};

export default ReviewList;
