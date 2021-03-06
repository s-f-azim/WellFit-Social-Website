import { List, Rate, Button } from 'antd';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { deleteReview } from '../utils/review';

const ReviewList = ({ reviews }) => {
  const { user } = useContext(UserContext);

  const handleDeleteClick = (reviewedId) => {
    deleteReview(reviewedId);
  };

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            key={review.reviewer._id}
            extra={
              <>
                <Button type="primary" onClick={() => handleDeleteClick(review.reviewed)} danger>
                  DELETE
                </Button>
                <Rate disabled defaultValue={review.rate} />
              </>
            }
          >
            <List.Item.Meta title={review.reviewer.name} />
            {review.comment}
          </List.Item>
        )}
      />
    </>
  );
};

export default ReviewList;
