import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCard from '../components/generalComponents/Search/CourseCard';
import { getCourseCreators } from '../actions/course';

const courseCreator = {
  _id: '1',
  fName: 'testUser',
  lName: `1`,
  email: `instructor1@test.com`,
};

const courseCreator2 = {
  _id: '2',
  fName: 'testUser',
  lName: `2`,
  email: `instructor2@test.com`,
};

const course1 = {
  _id: '3',
  title: 'course 1',
  photos: [],
  fitnessLevel: 'intermediate',
  price: 20,
  creators: ['1'],
  tags: ['Cycling'],
  description: 'course description',
};

const course2 = {
  _id: '4',
  title: 'course 2',
  photos: [],
  fitnessLevel: 'beginner',
  price: 20,
  creators: ['1', '2'],
  tags: ['Cycling', 'Cardio'],
  description: 'course description',
};

jest.mock('../actions/course', () => ({
  getCourseCreators: jest.fn(),
}));

it('renders course card with no delete icon if isWish is false', async () => {
  getCourseCreators.mockReturnValueOnce({
    data: { success: true, data: [courseCreator] },
  });
  await act(async () => {
    render(<CourseCard content={course1} isWish={false} />);
  });

  expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('testUser 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('intermediate', { exact: false })).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: 'delete' })).not.toBeInTheDocument();
});

it('renders course card with delete icon if isWish is true', async () => {
  getCourseCreators.mockReturnValueOnce({
    data: { success: true, data: [courseCreator] },
  });
  await act(async () => {
    render(<CourseCard content={course1} isWish={true} />);
  });

  expect(screen.getByText(course1.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course1.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('testUser 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('intermediate', { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'delete' })).toBeInTheDocument();
});

it('renders course card with more than one tag and creator correctly', async () => {
  getCourseCreators.mockReturnValueOnce({
    data: { success: true, data: [courseCreator, courseCreator2] },
  });
  await act(async () => {
    render(<CourseCard content={course2} isWish={true} />);
  });

  expect(screen.getByText(course2.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course2.tags[1], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('testUser 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('testUser 2', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('beginner', { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'delete' })).toBeInTheDocument();
});

it('displays course card modal only when course title is clicked', async () => {
  getCourseCreators.mockReturnValueOnce({
    data: { success: true, data: [courseCreator] },
  });
  await act(async () => {
    render(<CourseCard content={course1} isWish={false} />);
  });

  expect(screen.queryByRole('dialog', { name: 'profile course 1' })).not.toBeInTheDocument();
  expect(screen.queryByText(course1.description, { exact: false })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'goToCoursePage' })).not.toBeInTheDocument();

  userEvent.click(screen.getByText(course1.title, { exact: false }));
  expect(screen.getByRole('dialog', { name: 'profile course 1' })).toBeInTheDocument();
  expect(screen.getByText(course1.description, { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToCoursePage' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToCoursePage' })).toHaveAttribute(
    'href',
    '/courses/3'
  );
});

it(`modal closes when clicking the 'X' button`, async () => {
  getCourseCreators.mockReturnValueOnce({
    data: { success: true, data: [courseCreator] },
  });
  await act(async () => {
    render(<CourseCard content={course1} isWish={false} />);
  });

  userEvent.click(screen.getByText(course1.title, { exact: false }));
  expect(screen.getByRole('dialog', { name: 'profile course 1' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog', { name: 'profile course 1' })).not.toBeInTheDocument();
});
