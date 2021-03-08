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
      <Card>
        <ReviewList>
          {review && <ReviewListItem review={review} showMenu onDelete={() => setReview(null)} />}
          {reviews.map((r) => (
            <ReviewListItem review={r} showMenu={false} />
          ))}
        </ReviewList>
        {user && !review && <ReviewInput reviewedId={reviewUser._id} onSubmit={setReview} />}
      </Card>
    </>
  );
}
