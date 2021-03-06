import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { createRequest } from '../../actions/request';
import { deleteUser } from '../../actions/user';
import Settings from '../../pages/settings';

const client = { _id: '1', fName: 'user', lName: 'test', role: 'client' };
const instructor = { _id: '1', fName: 'user', lName: 'test', role: 'instructor' };

jest.mock('next-auth/client', () => ({
  useSession: jest.fn(),
}));

jest.mock('../../actions/request', () => ({
  createRequest: jest.fn(),
}));

jest.mock('../../actions/user', () => ({
  deleteUser: jest.fn(),
}));

jest.mock('next/router', () => {
  const push = jest.fn();
  const replace = jest.fn();
  return {
    useRouter: () => ({
      push,
      replace,
    }),
  };
});

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('settings renders and tabs are there', () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);

  expect(screen.getByRole('tab', { name: 'Account settings' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Contact us' })).toBeInTheDocument();
});

it('renders the screen of Account settings when settings is rendered', () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);

  expect(screen.getByRole('tabpanel', { name: 'Account settings' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'edit password' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'edit basic' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'edit in-depth' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
});

it('renders the Contact us section in settings with verify request box for instructor users', () => {
  const user = instructor;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  userEvent.click(screen.getByRole('tab', { name: 'Contact us' }));

  expect(screen.getByRole('tabpanel', { name: 'Contact us' })).toBeInTheDocument();

  expect(screen.getByRole('textbox', { name: 'bug report box' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'verify request box' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'button bug report' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'button verify request' })).toBeInTheDocument();
});

it('renders the Contact us section in settings without verify request box for client users', () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  userEvent.click(screen.getByRole('tab', { name: 'Contact us' }));

  expect(screen.getByRole('tabpanel', { name: 'Contact us' })).toBeInTheDocument();

  expect(screen.getByRole('textbox', { name: 'bug report box' })).toBeInTheDocument();
  expect(screen.queryByRole('textbox', { name: 'verify request box' })).not.toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'button bug report' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'button verify request' })).not.toBeInTheDocument();
});

it('routes correctly for pressing edit password button in Account settings', async () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  expect(screen.getByRole('tabpanel', { name: 'Account settings' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'edit password' }));

  const router = useRouter();

  await waitFor(() =>
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/editProfile',
      query: { tab: '3' },
    })
  );
});

it('routes correctly for clicking edit basic button in Account settings', async () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  expect(screen.getByRole('tabpanel', { name: 'Account settings' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'edit basic' }));

  const router = useRouter();

  await waitFor(() =>
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/editProfile',
      query: { tab: '1' },
    })
  );
});

it('routes correctly for clicking edit in-depth button in Account settings', async () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  expect(screen.getByRole('tabpanel', { name: 'Account settings' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'edit in-depth' }));

  const router = useRouter();

  await waitFor(() =>
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/editProfile',
      query: { tab: '2' },
    })
  );
});

it('routes correctly for clicking delete in button press Account settings', async () => {
  const user = client;
  useSession.mockReturnValue([{ user }, false]);
  deleteUser.mockReturnValue({ data: { success: true, data: {} } });
  render(<Settings />);
  expect(screen.getByRole('tabpanel', { name: 'Account settings' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'delete' }));
  expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'CONFIRM' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'CONFIRM' }));

  await waitFor(() => expect(deleteUser).toBeCalled());

  const router = useRouter();

  await waitFor(() => expect(router.replace).toHaveBeenCalledWith('/'));
});

it('Contact us screen textbox and submit button is working', async () => {
  const user = instructor;
  useSession.mockReturnValue([{ user }, false]);
  render(<Settings />);
  userEvent.click(screen.getByRole('tab', { name: 'Contact us' }));

  expect(screen.getByRole('tabpanel', { name: 'Contact us' })).toBeInTheDocument();

  userEvent.type(screen.getByRole('textbox', { name: 'bug report box' }), 'Please see the bug');
  userEvent.click(screen.getByRole('button', { name: 'button bug report' }));
  await waitFor(() => expect(createRequest).toHaveBeenCalledWith('bug', 'Please see the bug'));

  userEvent.type(screen.getByRole('textbox', { name: 'verify request box' }), 'Please verify me');
  userEvent.click(screen.getByRole('button', { name: 'button verify request' }));
  await waitFor(() => expect(createRequest).toHaveBeenCalledWith('verify', 'Please verify me'));
});
