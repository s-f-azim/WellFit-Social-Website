/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import ReviewList from './ReviewList';
import ReviewInput from './ReviewInput';

import {
  createUserReview,
  deleteUserReview,
  createCourseReview,
  deleteCourseReview,
} from '../actions/review';

const Review = ({ entity, onSubmit, onDelete }) => {
  const [session] = useSession();
  const [user, setUser] = useState();
  const [review, setReview] = useState();
  const [reviews, setReviews] = useState(entity.reviews);

  useEffect(() => {
    if (session) setUser(session.user);
  }, [session]);

  useEffect(() => {
    if (user) {
      setReview(reviews.find(({ author }) => author._id === user._id));
      setReviews(reviews.filter(({ author }) => author._id !== user._id));
    }
  }, [user]);

  const handleSubmit = async (values) => {
    setReview(await onSubmit(values));
  };

  const handleDelete = () => {
    onDelete();
    setReview(null);
  };

  return (
    <>
      <div>
        <ReviewList>
          {review && <ReviewList.Item review={review} onDelete={handleDelete} showMenu />}
          {reviews.map((r) => (
            <ReviewList.Item review={r} showMenu={false} />
          ))}
        </ReviewList>
        {user && !review && <ReviewInput onSubmit={handleSubmit} />}
      </div>
    </>
  );
};

const UserReview = ({ user }) => {
  const handleSubmit = async (values) => {
    const response = await createUserReview(user._id, values);
    return response.data.data;
  };

  const handleDelete = () => {
    deleteUserReview(user._id);
  };

  return <Review entity={user} onSubmit={handleSubmit} onDelete={handleDelete} />;
};

const CourseReview = ({ course }) => {
  const handleSubmit = async (values) => {
    const response = await createCourseReview(course._id, values);
    return response.data.data;
  };

  const handleDelete = () => {
    deleteCourseReview(course._id);
  };

  return <Review entity={course} onSubmit={handleSubmit} onDelete={handleDelete} />;
};

export { CourseReview, UserReview };
