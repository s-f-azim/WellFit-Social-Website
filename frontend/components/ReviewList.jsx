/* eslint-disable no-underscore-dangle */
import { List, Rate, Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { deleteReview } from '../utils/review';

const ReviewListItem = ({ review, showMenu, onDelete }) => {
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
        <List.Item.Meta title={review.reviewer.name} />
        {review.comment}
      </List.Item>
    </>
  );
};

const ReviewList = ({ children }) => (
  <>
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
    >
      {children}
    </List>
  </>
);

export { ReviewList, ReviewListItem };
