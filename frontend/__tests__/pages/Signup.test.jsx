import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import { useRouter } from 'next/router';
import { signup } from '../../services/auth';
import Signup from '../../pages/signup';

jest.mock('../../services/auth', () => ({
  signup: jest.fn(),
}));

jest.mock('next/router', () => {
  const push = jest.fn();
  return {
    useRouter: () => ({
      push,
    }),
  };
});

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fields', () => {
  render(<Signup />);

  expect(screen.getByRole('combobox', { name: 'select' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'First name' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Last name' })).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'location' })).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'agreement' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
});

it.only('signs up user when submitted with valid data and redirects', async () => {
  signup.mockReturnValue({ data: { success: true, data: {} } });
  render(<Signup />);

  const user = {
    email: 'signin.test@email.com',
    fName: 'test',
    lName: 'signup',
    password: '12345678',
    confirm: '12345678',
    role: 'client',
  };

  userEvent.selectOptions(screen.getByRole('combobox', { name: 'select' }), user.role);
  userEvent.type(screen.getByRole('textbox', { name: 'email' }), user.email);
  userEvent.type(screen.getByRole('textbox', { name: 'First name' }), user.fName);
  userEvent.type(screen.getByRole('textbox', { name: 'Last name' }), user.lName);
  userEvent.type(screen.getByLabelText('Password'), user.password);
  userEvent.type(screen.getByLabelText('Confirm Password'), user.confirm);
  userEvent.click(screen.getByRole('checkbox', { name: 'agreement' }));
  userEvent.click(screen.getByRole('button', { name: 'Register' }));

  await waitFor(() =>
    expect(signup).toHaveBeenCalledWith(
      user.role,
      user.email,
      user.fName,
      user.lName,
      user.password,
      user.address
    )
  );

  const router = useRouter();
  await waitFor(() => expect(router.push).toHaveBeenCalledWith('/login'));
});
