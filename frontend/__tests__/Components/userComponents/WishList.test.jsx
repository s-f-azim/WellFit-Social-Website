import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import { expect } from '@jest/globals';
import WishList from '../../../components/userComponents/WishList';
import { getWishList, updateWishList } from '../../../actions/user';

const course1 = {
  _id: 'course1',
  title: 'course 1',
  photos: [],
  fitnessLevel: 'beginner',
  price: 20,
  creators: ['instructor1'],
  tags: ['Cycling'],
  description: 'course description',
};

const course2 = {
  _id: 'course2',
  title: 'course 2',
  photos: [],
  fitnessLevel: 'intermediate',
  price: 20,
  creators: ['instructor1'],
  tags: ['Cardio'],
  description: 'course description',
};

const course3 = {
  _id: 'course3',
  title: 'course 3',
  photos: [],
  fitnessLevel: 'advanced',
  price: 20,
  creators: ['instructor1'],
  tags: ['Sweat'],
  description: 'course description',
};

const course4 = {
  _id: 'course4',
  title: 'course 4',
  photos: [],
  fitnessLevel: 'advanced',
  price: 20,
  creators: ['instructor1'],
  tags: ['GetFit'],
  description: 'course description',
};

const instructor = {
  _id: 'instructor1',
  fName: 'instructor',
  lName: `1`,
  email: `instructor1@test.com`,
};

jest.mock('../../../actions/user', () => ({
  getWishList: jest.fn(),
  updateWishList: jest.fn(),
}));

jest.mock('../../../actions/course', () => ({
  getCourseCreators: () => ({ data: { success: true, data: [instructor] } }),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders loading circle initially', async () => {
  getWishList.mockReturnValueOnce({
    data: { success: true, data: [course1, course2, course3, course4] },
  });
  render(<WishList />);

  expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();
});

it('renders all four course cards with correct details and delete icons', async () => {
  getWishList.mockReturnValueOnce({
    data: { success: true, data: [course1, course2, course3, course4] },
  });
  render(<WishList />);

  await waitFor(() => {
    expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course2.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course3.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course4.title, { exact: false })).toBeInTheDocument();

    expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course2.tags[0], { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course3.tags[0], { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course4.tags[0], { exact: false })).toBeInTheDocument();

    expect(screen.getAllByText('instructor 1', { exact: false })).toHaveLength(4);
    expect(screen.getAllByText('beginner', { exact: false })).toHaveLength(1);
    expect(screen.getAllByText('intermediate', { exact: false })).toHaveLength(1);
    expect(screen.getAllByText('advanced', { exact: false })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'delete' })).toHaveLength(4);
  });
});

it('renders empty wish list message if wish list contains no courses', async () => {
  getWishList.mockReturnValueOnce({
    data: { success: true, data: [] },
  });
  render(<WishList />);

  await waitFor(() => {
    expect(
      screen.getByText('Your wish list is currently empty', { exact: false })
    ).toBeInTheDocument();
  });
});

it('clicking delete icon removes course from wish list', async () => {
  getWishList.mockReturnValueOnce({
    data: { success: true, data: [course1, course2, course3, course4] },
  });
  render(<WishList />);

  await waitFor(() => {
    expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
    expect(screen.getAllByText('instructor 1', { exact: false })).toHaveLength(4);
    expect(screen.getAllByText('beginner', { exact: false })).toHaveLength(1);
  });

  const course1DeleteIcon = screen.getAllByRole('img', { name: 'delete' })[0];
  userEvent.click(course1DeleteIcon);
  await waitFor(() => expect(updateWishList).toHaveBeenCalledTimes(1));
  await waitFor(() => {
    expect(screen.queryByText(course1.title, { exact: false })).not.toBeInTheDocument();
    expect(screen.queryByText(course1.tags[0], { exact: false })).not.toBeInTheDocument();
    expect(screen.getAllByText('instructor 1', { exact: false })).toHaveLength(3);
    expect(screen.queryByText('beginner', { exact: false })).not.toBeInTheDocument();
  });
});
