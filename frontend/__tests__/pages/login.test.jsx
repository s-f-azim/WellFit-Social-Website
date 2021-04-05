import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { notification } from 'antd';

import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { login } from '../../services/auth';

import Login from '../../pages/login';

jest.mock('next-auth/client', () => ({
  signIn: jest.fn(),
}));

jest.mock('../../services/auth', () => ({
  login: jest.fn(),
}));

jest.mock('next/router', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
    }),
  };
});

jest.mock('../../services/api', () => ({
  get: jest.fn(),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fields', () => {
  render(<Login />);

  expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
});

it('logs in user when submitted with valid data and redirects', async () => {
  render(<Login />);

  const user = {
    email: 'valid@email.com',
    password: 'supersecret',
  };

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), user.email);
  userEvent.type(screen.getByLabelText(/password/i), user.password);

  userEvent.click(screen.getByRole('button', { name: 'login' }));
  await waitFor(() =>
    expect(signIn).toHaveBeenCalledWith('credentials', { ...user, redirect: false })
  );
  await waitFor(() => expect(login).toHaveBeenCalledWith(user.email, user.password));
  const router = useRouter();
  await waitFor(() => expect(router.push).toHaveBeenCalledWith('/'));
});

it('does not log in user when submitted with invalid data', async () => {
  render(<Login />);

  const user = {
    email: 'invalid@email',
    password: 'supersecret',
  };

  userEvent.type(screen.getByRole('textbox', { name: 'email' }), user.email);
  userEvent.type(screen.getByLabelText(/password/i), user.password);

  userEvent.click(screen.getByRole('button', { name: 'login' }));
  await waitFor(() => expect(signIn).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(login).toHaveBeenCalledTimes(0));
  const router = useRouter();
  await waitFor(() => expect(router.push).toHaveBeenCalledTimes(0));
});
