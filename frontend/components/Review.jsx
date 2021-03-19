/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Card } from 'antd';
import ReviewList from './ReviewList';
import ReviewInput from './ReviewInput';

import {
  createUserReview,
  getUserReviews,
  deleteUserReview,
  createCourseReview,
  getCourseReviews,
  deleteCourseReview,
} from '../actions/review';

const Review = ({ getReviews, onSubmit, onDelete }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState();
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(async () => {
    setReviews(await getReviews());
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  useEffect(() => {
    setHasReviewed(user && reviews && reviews.find((r) => r.author._id === user._id));
  }, [user, reviews]);

  const handleSubmit = async (values) => {
    const response = await onSubmit(values);
    setReviews([response.data.data, ...reviews]);
  };

  const handleDelete = () => {
    onDelete();
    setReviews(reviews.filter((r) => r.author._id !== user._id));
  };

  return (
    <Card>
      <ReviewList
        reviews={reviews}
        renderItem={(r) => (
          <ReviewList.Item
            review={r}
            onDelete={user && user._id === r.author._id ? handleDelete : undefined}
          />
        )}
        loading={loading}
      />
      {user && !hasReviewed && <ReviewInput onSubmit={handleSubmit} />}
    </Card>
  );
};

const UserReview = ({ id }) => {
  <Review
    getReviews={() => getUserReviews(id)}
    onSubmit={(values) => createUserReview(id, values)}
    onDelete={() => deleteUserReview(id)}
  />;
};

const CourseReview = ({ id }) => (
  <Review
    getReviews={() => getCourseReviews(id)}
    onSubmit={(values) => createCourseReview(id, values)}
    onDelete={() => deleteCourseReview(id)}
  />
);

export { CourseReview, UserReview };
