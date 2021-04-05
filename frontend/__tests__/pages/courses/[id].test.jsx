/* eslint-disable no-underscore-dangle */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/client';
import { getWishList, updateWishList } from '../../../actions/user';
import Course from '../../../pages/courses/[id]';

const adminUser = {
  _id: 'user1',
  fName: 'admin',
  lName: 'user',
  role: 'admin',
  wishlist: [],
};

const instructorUser = {
  _id: 'user2',
  fName: 'instructor',
  lName: 'user',
  role: 'instructor',
  wishlist: [],
};

const instructorUser2 = {
  _id: 'user3',
  fName: 'instructor2',
  lName: 'user',
  role: 'instructor',
  wishlist: [],
};

const clientUser = {
  _id: 'user4',
  fName: 'client',
  lName: 'user',
  role: 'client',
  wishlist: ['course1'],
};

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

const course2 = {
  _id: 'course2',
  title: 'course 2',
  photos: [],
  fitnessLevel: 'intermediate',
  price: 20,
  creators: ['user2', 'user3'],
  tags: ['Cardio', 'Cycling'],
  description: 'testDescription',
  trainingDuration: 30,
  isVirtual: false,
  gym: true,
};

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
  getCourseCreators: () => ({ data: { success: true, data: [instructorUser, instructorUser2] } }),
}));

jest.mock('../../../actions/review', () => ({
  createCourseReview: jest.fn(),
  getCourseReviews: jest.fn(),
  deleteCourseReview: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('renders course page with correct details when logged in', async () => {
  const user = adminUser;
  useSession.mockReturnValue([{ user }, false]);
  render(<Course course={course1} />);
  expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.description, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.price, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.fitnessLevel, { exact: false })).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText(`Go To ${instructorUser.fName}'s Profile`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Go To ${instructorUser2.fName}'s Profile`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'goToProfilePage' })).toHaveLength(2);
  });

  expect(screen.getByRole('button', { name: 'purchase' })).toBeInTheDocument();
  expect(screen.getByText('This is a virtual course', { exact: false })).toBeInTheDocument();
  expect(
    screen.getByText('You can take this course from home', { exact: false })
  ).toBeInTheDocument();
});

it('renders course page with correct details when not logged in', async () => {
  useSession.mockReturnValue([null, false]);
  render(<Course course={course2} />);
  expect(screen.getByText(course2.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.description, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.price, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.tags[1], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.fitnessLevel, { exact: false })).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText(`Go To ${instructorUser.fName}'s Profile`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Go To ${instructorUser2.fName}'s Profile`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'goToProfilePage' })).toHaveLength(2);
  });

  expect(screen.getByRole('button', { name: 'purchase' })).toBeInTheDocument();
  expect(screen.getByText('This is an in-person course', { exact: false })).toBeInTheDocument();
  expect(
    screen.getByText('You need access to a gym for this course', { exact: false })
  ).toBeInTheDocument();
});

it('getWishList is not called if there is no session', async () => {
  useSession.mockReturnValue([null, false]);
  render(<Course course={course1} />);
  await waitFor(() => expect(getWishList).toHaveBeenCalledTimes(0));
});

it('getWishList is not called if the user is an admin', async () => {
  const user = adminUser;
  useSession.mockReturnValue([{ user }, false]);
  render(<Course course={course1} />);
  await waitFor(() => expect(getWishList).toHaveBeenCalledTimes(0));
});

it('getWishList is not called if the user is an instructor', async () => {
  const user = instructorUser;
  useSession.mockReturnValue([{ user }, false]);
  render(<Course course={course1} />);
  await waitFor(() => expect(getWishList).toHaveBeenCalledTimes(0));
});

it('getWishList is called if the user is a client', async () => {
  const user = clientUser;
  useSession.mockReturnValue([{ user }, false]);
  getWishList.mockReturnValue({
    data: { success: true, data: [course1] },
  });
  render(<Course course={course1} />);
  await waitFor(() => expect(getWishList).toHaveBeenCalledTimes(1));
});

it('add to wish list button is not displayed if there is no session', async () => {
  useSession.mockReturnValue([null, false]);
  render(<Course course={course1} />);
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'addToWishList' })).not.toBeInTheDocument();
  });
});

it('add to wish list button is not displayed if the user is an admin', async () => {
  const user = adminUser;
  useSession.mockReturnValue([{ user }, false]);
  render(<Course course={course1} />);
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'addToWishList' })).not.toBeInTheDocument();
  });
});

it('add to wish list button is not displayed if the user is an instructor', async () => {
  const user = instructorUser;
  useSession.mockReturnValue([{ user }, false]);
  render(<Course course={course1} />);
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'addToWishList' })).not.toBeInTheDocument();
  });
});

it('add to wish list button is not displayed if course is already in wish list', async () => {
  const user = clientUser;
  useSession.mockReturnValue([{ user }, false]);
  getWishList.mockReturnValue({
    data: { success: true, data: [course1] },
  });
  render(<Course course={course1} />);
  await waitFor(() => {
    expect(screen.queryByRole('button', { name: 'addToWishList' })).not.toBeInTheDocument();
  });
});

it('add to wish list button is displayed if course is not in wish list', async () => {
  const user = clientUser;
  useSession.mockReturnValue([{ user }, false]);
  getWishList.mockReturnValue({
    data: { success: true, data: [course1] },
  });
  render(<Course course={course2} />);
  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'addToWishList' })).toBeInTheDocument();
  });
});

it('add to wish list button calls update wish list and disappears once clicked', async () => {
  const user = clientUser;
  useSession.mockReturnValue([{ user }, false]);
  getWishList.mockReturnValue({
    data: { success: true, data: [course1] },
  });
  render(<Course course={course2} />);
  const addToWishListButton = await waitFor(() =>
    screen.getByRole('button', { name: 'addToWishList' })
  );
  userEvent.click(addToWishListButton);
  await waitFor(() => {
    expect(updateWishList).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('button', { name: 'addToWishList' })).not.toBeInTheDocument();
  });
});
