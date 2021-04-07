import { render, screen } from '@testing-library/react';
import PeopleResults from '../../../../components/generalComponents/Search/PeopleResults';

const users = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  fName: `user ${n}`,
  lName: `test ${n}`,
  gender: `gender ${n}`,
  tags: [],
  photos: [],
}));

it('renders people', () => {
  render(<PeopleResults data={users} />);

  users.forEach((u) => {
    expect(screen.getByText(u.fName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(u.lName, { exact: false })).toBeInTheDocument();
  });
});
