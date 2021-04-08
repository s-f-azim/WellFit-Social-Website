import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import GetFollow from '../../../components/userComponents/GetFollow';

const followingUser = [1, 2, 3, 4].map((u) => ({
  _id: `${u}`,
  fName: `user ${u}`,
  lName: `test ${u}`,
}));

it('renders users in a list', () => {
  render(<GetFollow data={followingUser} />);

  expect(screen.getAllByRole('listitem', { name: 'list' })).toHaveLength(followingUser.length);

  followingUser.forEach((post) => {
    expect(
      screen.getByText(
        `${post.fName.charAt(0).toUpperCase() + post.fName.substr(1).toLowerCase()} ${
          post.lName.charAt(0).toUpperCase() + post.lName.substr(1).toLowerCase()
        }`
      )
    ).toBeInTheDocument();
  });
});
