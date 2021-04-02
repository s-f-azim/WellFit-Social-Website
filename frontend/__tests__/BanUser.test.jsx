import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import BanUser from '../components/adminComponents/BanUser';

import { banUser } from '../actions/user';

jest.mock('../actions/user', () => ({
  banUser: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fields', () => {
  render(<BanUser />);

  expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'ban' })).toBeInTheDocument();
});

it('bans user when submitted with valid data', async () => {
  const email = 'valid@email.com';
  const users = [{ _id: '1', email }];
  render(<BanUser users={users} />);

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), email);
  userEvent.click(screen.getByRole('button', { name: 'ban' }));
  await waitFor(() => expect(banUser).toHaveBeenCalledTimes(1));
});

it('does not ban user when submitted with invalid data', async () => {
  const email = 'invalid@email';
  const users = [{ _id: '1', email }];
  render(<BanUser users={users} />);

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), email);
  userEvent.click(screen.getByRole('button', { name: 'ban' }));
  await waitFor(() => expect(banUser).toHaveBeenCalledTimes(0));
});
