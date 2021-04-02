import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import EditProfilePage from '../../pages/editProfile';

import updateUser from '../../actions/user';

jest.mock('next-auth/client', () => {
  const user = { _id: '1', fName: 'user', lName: 'test' };
  return {
    useSession: () => [{ user }, false],
  };
});

jest.mock('../../actions/user');

jest.mock('../../config');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

describe('profile info', () => {
  it('renders fields', () => {
    render(<EditProfilePage />);

    expect(screen.getByRole('combobox', { name: 'gender' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'nickname' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'bio' })).toBeInTheDocument();
    expect(screen.getByRole('listbox', { name: 'tags' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'update' })).toBeInTheDocument();
  });

  it('updates profile info when submitted with valid data', async () => {
    updateUser.mockReturnValue({ data: { success: true, data: {} } });
    render(<EditProfilePage />);

    const user = {
      gender: 'Prefer not to say',
      nickname: 'test nickname',
      bio: 'test bio',
      tags: ['Fitness', 'GetStrong', 'WeightLifting'],
    };

    userEvent.selectOptions(screen.getByRole('combobox', { name: 'gender' }), user.gender);
    userEvent.type(screen.getByRole('textbox', { name: 'nickname' }), user.nickname);
    userEvent.type(screen.getByRole('textbox', { name: 'bio' }), user.bio);
    userEvent.selectOptions(screen.getByRole('listbox', { name: 'tags' }), user.tags);

    userEvent.click(screen.getByRole('button', { name: 'update' }));
    await waitFor(() => expect(updateUser).toHaveBeenCalledWith(user));
  });
});

describe('credentials', () => {
  it('renders fields', () => {
    render(<EditProfilePage />);

    userEvent.click(screen.getByRole('tab', { name: 'Credentials' }));

    expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'confirm' })).toBeInTheDocument();
  });

  it('updates credentials when submitted with valid data', async () => {
    updateUser.mockReturnValue({ data: { success: true, data: {} } });
    render(<EditProfilePage />);

    const user = {
      email: 'valid@email.com',
      password: 'supersecret',
      confirm: 'supersecret',
    };

    userEvent.click(screen.getByRole('tab', { name: 'Credentials' }));

    userEvent.type(screen.getByRole('textbox', { name: 'email' }), user.email);
    userEvent.type(screen.getByLabelText(/new password/i), user.password);
    userEvent.type(screen.getByLabelText(/confirm password/i), user.confirm);

    userEvent.click(screen.getByRole('button', { name: 'confirm' }));
    await waitFor(() => expect(updateUser).toHaveBeenCalledWith(user));
  });

  it('does not update credentials when submitted with invalid data', async () => {
    updateUser.mockReturnValue({ data: { success: true, data: {} } });
    render(<EditProfilePage />);

    const user = {
      email: 'valid@email.com',
      password: 'supersecret1',
      confirm: 'supersecret2',
    };

    userEvent.click(screen.getByRole('tab', { name: 'Credentials' }));

    userEvent.type(screen.getByRole('textbox', { name: 'email' }), user.email);
    userEvent.type(screen.getByLabelText(/new password/i), user.password);
    userEvent.type(screen.getByLabelText(/confirm password/i), user.confirm);

    userEvent.click(screen.getByRole('button', { name: 'confirm' }));
    await waitFor(() => expect(updateUser).toHaveBeenCalledTimes(0));
  });
});
