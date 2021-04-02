import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import DeleteUser from '../components/adminComponents/DeleteUser';

import { deleteSpecificUser } from '../actions/user';

jest.mock('../actions/user', () => ({
  deleteSpecificUser: jest.fn(),
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
  render(<DeleteUser />);

  expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
});

it('deletes user when submitted with valid data', async () => {
  const email = 'valid@email.com';
  const users = [{ _id: '1', email }];
  render(<DeleteUser users={users} />);

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), email);
  userEvent.click(screen.getByRole('button', { name: 'delete' }));
  await waitFor(() => expect(deleteSpecificUser).toHaveBeenCalledTimes(1));
});

it('does delete user when submitted with invalid data', async () => {
  const email = 'invalid@email';
  const users = [{ _id: '1', email }];
  render(<DeleteUser users={users} />);

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), email);
  userEvent.click(screen.getByRole('button', { name: 'delete' }));
  await waitFor(() => expect(deleteSpecificUser).toHaveBeenCalledTimes(0));
});
