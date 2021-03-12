/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import ReviewList from './ReviewList';
import ReviewInput from './ReviewInput';

import { useAuth } from '../services/auth';

export default function Review({ reviewUser }) {
  const { user } = useAuth();
  const [review, setReview] = useState();
  let { reviews } = reviewUser;

  useEffect(() => {
    if (user) {
      setReview(reviews.find(({ reviewer }) => reviewer._id === user._id));
      reviews = reviews.filter(({ reviewer }) => reviewer._id !== user._id);
    }
  }, []);

  return (
    <>
      <div>
        <ReviewList>
          {review && <ReviewList.Item review={review} onDelete={() => setReview(null)} showMenu />}
          {reviews.map((r) => (
            <ReviewList.Item review={r} showMenu={false} />
          ))}
        </ReviewList>
        {user && !review && <ReviewInput reviewedId={reviewUser._id} onSubmit={setReview} />}
      </div>
    </>
  );
}