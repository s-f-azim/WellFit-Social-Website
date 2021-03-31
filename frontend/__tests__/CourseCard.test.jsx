import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseCard from '../components/generalComponents/Search/CourseCard';

const courseCreator = {
  _id: '1',
  fName: 'instructor',
  lName: `1`,
  email: `instructor1@test.com`,
};

const course = {
  title: 'course 1',
  photos: [],
  fitnessLevel: 'intermediate',
  price: 20,
  creators: ['1'],
  tags: ['Cycling'],
  description: 'course description',
};

jest.mock('../actions/course', () => ({
  getCourseCreators: () => ({ data: { success: true, data: [courseCreator] } }),
}));

it('renders course card with no delete icon if isWish is false', async () => {
  await act(async () => {
    render(<CourseCard content={course} isWish={false} />);
  });

  expect(screen.getByText(course.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('instructor 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('intermediate', { exact: false })).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: 'delete' })).not.toBeInTheDocument();
});

it('renders course card with delete icon if isWish is true', async () => {
  await act(async () => {
    render(<CourseCard content={course} isWish={true} />);
  });

  expect(screen.getByText(course.title, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(course.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('instructor 1', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('intermediate', { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'delete' })).toBeInTheDocument();
});

it('displays course card modal only when course title is clicked', async () => {
  await act(async () => {
    render(<CourseCard content={course} isWish={false} />);
  });

  expect(screen.queryByRole('dialog', { name: 'profile course 1' })).not.toBeInTheDocument();
  expect(screen.queryByText(course.description, { exact: false })).not.toBeInTheDocument();

  userEvent.click(screen.getByText(course.title, { exact: false }));
  expect(screen.getByRole('dialog', { name: 'profile course 1' })).toBeInTheDocument();
  expect(screen.getByText(course.description, { exact: false })).toBeInTheDocument();
});

it(`modal closes when clicking the 'X' button`, async () => {
  await act(async () => {
    render(<CourseCard content={course} isWish={false} />);
  });

  userEvent.click(screen.getByText(course.title, { exact: false }));
  expect(screen.getByRole('dialog', { name: 'profile course 1' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog', { name: 'profile course 1' })).not.toBeInTheDocument();
});
