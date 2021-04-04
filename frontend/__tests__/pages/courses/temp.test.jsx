/* eslint-disable no-underscore-dangle */
import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/client';
// import { useRouter } from 'next/router';
// import { getWishList, updateWishList } from '../../../actions/user';
// import { getCourseCreators } from '../../../actions/course';
import Course from '../../../pages/courses/[id]';

const user1 = {
  _id: 'user1',
  fName: 'admin',
  lName: 'user',
  role: 'admin',
  wishlist: [],
};

const user2 = {
  _id: 'user2',
  fName: 'instructor',
  lName: 'user',
  role: 'instructor',
  wishlist: [],
};

const user3 = {
  _id: 'user3',
  fName: 'instructor2',
  lName: 'user',
  role: 'instructor',
  wishlist: [],
};

// const user4 = {
//   _id: 'user3',
//   fName: 'client',
//   lName: 'user',
//   role: 'client',
//   wishlist: ['course1'],
// };

const course1 = {
  _id: 'course1',
  title: 'course 1',
  photos: [],
  fitnessLevel: 'beginner',
  price: 20,
  creators: ['user2', 'user3'],
  tags: ['Cycling'],
  description: 'testDescription',
  trainingDuration: 60,
  isVirtual: true,
  gym: false,
};

// const course2 = {
//   _id: 'course2',
//   title: 'course 2',
//   photos: [],
//   fitnessLevel: 'intermediate',
//   price: 20,
//   creators: ['user2', 'user3'],
//   tags: ['Cardio'],
//   description: 'testDescription',
//   trainingDuration: 30,
//   isVirtual: false,
//   gym: true,
// };

jest.mock('next-auth/client', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/router', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
    }),
  };
});

jest.mock('../../../actions/user', () => ({
  getWishList: jest.fn(),
  updateWishList: jest.fn(),
}));

jest.mock('../../../actions/course', () => ({
  getCourseCreators: () => ({ data: { success: true, data: [user2, user3] } }),
}));

it('renders course page with correct details', async () => {
  useSession.mockReturnValue([{ user1 }, false]);
  render(<Course course={course1} />);
  expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.description, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.price, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.fitnessLevel, { exact: false })).toBeInTheDocument();
  //expect(screen.getByText(`Go To ${user2.fName}'s Profile`, { exact: false })).toBeInTheDocument();
  //expect(screen.getByText(`Go To ${user3.fName}'s Profile`, { exact: false })).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getAllByRole('link', { name: 'goToProfilePage' })).toHaveLength(2);
  });

  expect(screen.getByRole('button', { name: 'purchase' })).toBeInTheDocument();
  expect(screen.getByText('This is a virtual course', { exact: false })).toBeInTheDocument();
  expect(
    screen.getByText('You can take this course from home', { exact: false })
  ).toBeInTheDocument();
});
