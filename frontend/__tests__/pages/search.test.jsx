import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import equip from '../../data/equipment';
import tags from '../../data/tags';

import { getCourseCreators, getCourses } from '../../actions/course';
import { getPeople } from '../../actions/user';

import Search from '../../pages/search';

const users = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  fName: `user ${n}`,
  lName: `test ${n}`,
  age: `${n}`,
  gender: 'male',
  role: `role ${n}`,
  photos: [],
  tags: [],
  follower: [],
  following: [],
}));

const courses = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  title: `Course ${n}`,
  price: `${n}`,
  creator: `maker ${n}`,
  descripton: `course does ${n}`,
  fitnessLevel: `level ${n}`,
  photos: [],
  tags: [],
}));

jest.mock('../../actions/user', () => ({
  getPeople: jest.fn(),
}));

jest.mock('../../actions/course', () => ({
  getCourses: jest.fn(),
  getCourseCreators: jest.fn(),
}));

jest.mock('next/router', () => {
  const router = {
    push: jest.fn(),
    query: {
      tab: 'People',
    },
  };
  return {
    useRouter: () => router,
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

it('search renders and radio buttons are there', () => {
  render(<Search />);
  expect(screen.getByRole('radio', { name: 'Questionnaire' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'People' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: 'Courses' })).toBeInTheDocument();
});

it('search renders People is default radio', () => {
  render(<Search />);
  expect(screen.getByRole('combobox', { name: 'gender selection' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'role selection' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

  expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Non-Binary' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'All Genders' })).toBeInTheDocument();

  tags.forEach((tag) => {
    expect(screen.getByRole('option', { name: `${tag}` })).toBeInTheDocument();
  });
});

it('search renders Course radio selected then tags & equipment are there', () => {
  render(<Search />);
  userEvent.click(screen.getByRole('radio', { name: 'Courses' }));

  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

  tags.forEach((tag) => {
    expect(screen.getByRole('option', { name: `${tag}` })).toBeInTheDocument();
  });
  equip.forEach((quipt) => {
    expect(screen.getByRole('option', { name: `${quipt}` })).toBeInTheDocument();
  });
});

it('renders the users in the search page', async () => {
  getPeople.mockReturnValueOnce({
    data: { data: users, pagination: { total: `${users.length}` } },
  });
  await act(async () => {
    render(<Search />);
  });
  userEvent.click(screen.getByRole('radio', { name: 'People' }));
  users.forEach((u) => {
    expect(screen.getByText(`${u.fName} ${u.lName}`)).toBeInTheDocument();
  });
});

it('renders the courses in the search page', async () => {
  getCourseCreators.mockReturnValue({
    data: { success: true, data: [] },
  });
  getCourses.mockReturnValueOnce({
    data: { data: courses, pagination: { total: `${users.length}` } },
  });
  await act(async () => {
    render(<Search />);
  });
  await act(async () => {
    userEvent.click(screen.getByRole('radio', { name: 'Courses' }));
  });
  courses.forEach((c) => {
    expect(screen.getByText(`${c.title}`)).toBeInTheDocument();
  });
});
