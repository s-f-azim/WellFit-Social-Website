import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatList from '../components/userComponents/chatComponents/ChatList';
import api from '../services/api';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../services/api', () => ({
  get: jest.fn(),
}));

const users = [2, 3, 4, 5].map((n) => ({
  _id: `${n}`,
  fName: `user ${n}`,
  lName: `test ${n}`,
  photos: [],
}));

it.only('renders users', async () => {
  api.get.mockReturnValue({
    data: { success: true, data: users, pagination: { total: users.length } },
  });
  await act(async () => {
    render(<ChatList />);
  });

  users.forEach((u) => {
    expect(screen.getByText(u.fName, { exact: false })).toBeInTheDocument();
  });
});

it('opens conversation when user is clicked', async () => {
  api.get.mockReturnValueOnce({
    data: { success: true, data: users, pagination: { total: users.length } },
  });
  api.get.mockReturnValueOnce({
    data: { success: true, data: users, pagination: { total: users.length } },
  });
  api.get.mockReturnValue({
    data: { success: true, data: 'conversation' },
  });
  const setConversation = jest.fn();
  const setReceiver = jest.fn();
  await act(async () => {
    render(<ChatList setConversation={setConversation} setReciver={setReceiver} />);
  });

  userEvent.click(screen.getAllByRole('listitem')[0]);
  await waitFor(() => expect(setConversation).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(setReceiver).toHaveBeenCalledTimes(1));
});
