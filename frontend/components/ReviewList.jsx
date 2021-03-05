import { List, Rate } from 'antd';

const ReviewList = ({ reviews }) => {
  const a = 0;

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
          <List.Item key={review.author._id} extra={<Rate disabled defaultValue={review.rate} />}>
            <List.Item.Meta title={review.author.name} />
            {review.comment}
          </List.Item>
        )}
      />
    </>
  );
};

export default ReviewList;
