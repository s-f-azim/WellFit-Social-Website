import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatList from '../components/userComponents/chatComponents/ChatList';

import { getFollowingList } from '../actions/user';
import { createConversation, getConversation } from '../actions/conversation';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../actions/user', () => ({
  getFollowingList: jest.fn(),
}));

jest.mock('../actions/conversation', () => ({
  createConversation: jest.fn(),
  getConversation: jest.fn(),
}));

const users = [2, 3, 4, 5].map((n) => ({
  _id: `${n}`,
  fName: `user ${n}`,
  lName: `test ${n}`,
  photos: [],
}));

it('renders users', async () => {
  getFollowingList.mockReturnValue({
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
  const conversation = 'conversation';
  getFollowingList.mockReturnValue({
    data: { success: true, data: users, pagination: { total: users.length } },
  });
  getConversation.mockReturnValue({
    data: { success: true },
  });
  createConversation.mockReturnValue({
    data: { success: true, data: conversation },
  });

  const setConversation = jest.fn();
  const setReceiver = jest.fn();
  await act(async () => {
    render(<ChatList setConversation={setConversation} setReciver={setReceiver} />);
  });

  userEvent.click(screen.getAllByRole('listitem')[0]);
  await waitFor(() => expect(setConversation).toHaveBeenCalledWith(conversation));
  await waitFor(() => expect(setReceiver).toHaveBeenCalledWith(users[0]));
});
