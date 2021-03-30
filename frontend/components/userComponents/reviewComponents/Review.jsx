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
} from '../../../actions/review';

const Review = ({ getReviews, onSubmit, onDelete }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState();
  const [reviews, setReviews] = useState();
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setReviews(await getReviews());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  useEffect(() => {
    setHasReviewed(user && reviews && reviews.find((r) => r.author._id === user._id));
  }, [user, reviews]);

  const handleSubmit = async (values) => {
    const review = await onSubmit(values);
    setReviews([review, ...reviews]);
  };

  const handleDelete = () => {
    onDelete();
    setReviews(reviews.filter((r) => r.author._id !== user._id));
  };

  return (
    <Card style={{ border: '0px solid #f0f0f0' }}>
      <ReviewList
        reviews={reviews}
        loading={loading}
        renderItem={(r) => (
          <ReviewList.Item
            review={r}
            onDelete={user && user._id === r.author._id ? handleDelete : undefined}
          />
        )}
      />
      {user && !hasReviewed && <ReviewInput onSubmit={handleSubmit} />}
    </Card>
  );
};

const UserReview = ({ id }) => (
  <Review
    getReviews={() => getUserReviews(id)}
    onSubmit={(values) => createUserReview(id, values)}
    onDelete={() => deleteUserReview(id)}
  />
);

const CourseReview = ({ id }) => (
  <Review
    getReviews={() => getCourseReviews(id)}
    onSubmit={(values) => createCourseReview(id, values)}
    onDelete={() => deleteCourseReview(id)}
  />
);

export { CourseReview, UserReview, Review };
