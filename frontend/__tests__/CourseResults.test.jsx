import { render, screen } from '@testing-library/react';
import CourseResults from '../components/generalComponents/Search/CourseResults';

const courses = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  title: `course ${n}`,
  price: n,
  tags: [],
  trainingEquipment: [],
}));

it.only('renders courses', () => {
  render(<CourseResults data={courses} />);

  courses.forEach((c) => {
    expect(screen.getByText(c.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(c.price, { exact: false })).toBeInTheDocument();
  });
});
