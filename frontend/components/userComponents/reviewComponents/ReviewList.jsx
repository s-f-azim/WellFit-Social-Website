/* eslint-disable no-underscore-dangle */
import { List, Rate, Button, Menu, Dropdown, Card } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { deleteReview } from '../../../actions/review';

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

ReviewList.Item = ({ review, showMenu, onDelete }) => {
  const handleDeleteClick = (reviewedId) => {
    deleteReview(reviewedId);
    onDelete();
  };

  const ReviewMenu = () => (
    <>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="delete">
              <Button type="link" onClick={() => handleDeleteClick(review.reviewed)}>
                Delete
              </Button>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <DownOutlined />
      </Dropdown>
    </>
  );

  return (
    <>
      <List.Item
        key={review._id}
        actions={[showMenu && <ReviewMenu />]}
        extra={
          <>
            <Rate disabled defaultValue={review.rate} />
          </>
        }
      >
        <List.Item.Meta title={`${review.reviewer.fName} ${review.reviewer.lName}`} />
        {review.comment}
      </List.Item>
    </>
  );
};

export default ReviewList;
