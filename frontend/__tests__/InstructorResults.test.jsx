import { render, screen } from '@testing-library/react';
import InstructorResults from '../components/generalComponents/Search/InstructorResults';

const instructors = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  fName: `instructor ${n}`,
  lName: `test ${n}`,
  tags: [],
}));

it('renders instructors', () => {
  render(<InstructorResults data={instructors} />);

  instructors.forEach((i) => {
    expect(screen.getByText(i.fName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(i.lName, { exact: false })).toBeInTheDocument();
  });
});
