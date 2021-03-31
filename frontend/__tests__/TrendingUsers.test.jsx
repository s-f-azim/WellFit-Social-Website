import { render, screen, act } from '@testing-library/react';
import TrendingUsers from '../components/userComponents/TrendingUsers';

import { getTrendingUsers } from '../actions/user';

const users = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  fName: `user ${n}`,
  lName: `test ${n}`,
  role: `role ${n}`,
  follower: [],
}));

jest.mock('../actions/user', () => ({
  getTrendingUsers: jest.fn(),
}));

it('renders trending users', async () => {
  getTrendingUsers.mockReturnValue({
    data: { success: true, data: users },
  });
  await act(async () => {
    render(<TrendingUsers />);
  });
  users.forEach((u) => {
    expect(screen.getByText(u.fName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(u.lName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(u.role, { exact: false })).toBeInTheDocument();
  });
});
