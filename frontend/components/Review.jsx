/* eslint-disable no-underscore-dangle */
import { Card, Button } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { ReviewList, ReviewListItem } from './ReviewList';
import ReviewInput from './ReviewInput';

import UserContext from '../contexts/UserContext';

export default function Review({ reviewUser }) {
  const { user } = useContext(UserContext);
  const [review, setReview] = useState();
  let reviews = [];

  useEffect(() => {
    reviews = reviewUser.reviews;
    if (user) {
      setReview(reviews.find((r) => r.reviewer === user._id));
      reviews = reviews.filter((r) => r.reviewer !== user._id);
    }
  }, []);

  return (
    <>
      <Card>
        <ReviewList>
          {review && <ReviewList review={review} showMenu onDelete={setReview(null)} />}
          {reviews.map((r) => (
            <ReviewListItem review={r} showMenu={false} />
          ))}
        </ReviewList>
        {user && !review && <ReviewInput reviewedId={reviewUser._id} onSubmit={setReview} />}
      </Card>
    </>
  );
}
