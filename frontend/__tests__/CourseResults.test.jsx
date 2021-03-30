import { render, screen, act } from '@testing-library/react';
import CourseResults from '../components/generalComponents/Search/CourseResults';

import api from '../services/api';

jest.mock('../services/api', () => ({
  get: jest.fn(),
}));

const courses = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  title: `course ${n}`,
  description: `description ${n}`,
  price: n * 10,
  address: `address ${n}`,
  tags: [],
  photos: [],
}));

const creators = [1, 2].map((n) => ({
  _id: `${n}`,
  fName: `creator ${n}`,
  lName: `test ${n}`,
}));

it('renders courses', async () => {
  api.get.mockReturnValue({
    data: { success: true, data: creators },
  });

  await act(async () => {
    render(<CourseResults data={courses} />);
  });

  courses.forEach((c) => {
    expect(screen.getByText(c.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(c.price, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(c.address, { exact: false })).toBeInTheDocument();
  });
});
