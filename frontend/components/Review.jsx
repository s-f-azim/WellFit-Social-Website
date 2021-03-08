/* eslint-disable no-underscore-dangle */
import { Card, Space } from 'antd';
import { useState, useEffect } from 'react';
import { ReviewList, ReviewListItem } from './ReviewList';
import ReviewInput from './ReviewInput';

import { useAuth } from '../services/auth';

export default function Review({ reviewUser }) {
  const { user } = useAuth();
  const [review, setReview] = useState();
  let { reviews } = reviewUser;

  useEffect(() => {
    console.log('Review', user);
    if (user) {
      setReview(
        reviews.find(({ reviewer }) => {
          console.log(reviewer._id, user._id);
          return reviewer._id === user._id;
        })
      );
      reviews = reviews.filter(({ reviewer }) => reviewer._id !== user._id);
    }
  }, []);

  return (
    <>
      <div>
        <ReviewList>
          {review && <ReviewListItem review={review} showMenu onDelete={() => setReview(null)} />}
          {reviews.map((r) => (
            <ReviewListItem review={r} showMenu={false} />
          ))}
        </ReviewList>
        {user && !review && <ReviewInput reviewedId={reviewUser._id} onSubmit={setReview} />}
      </div>
    </>
  );
}
