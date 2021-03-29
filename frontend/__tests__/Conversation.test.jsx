import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import io from 'socket.io-client';
import Conversation from '../components/userComponents/chatComponents/Conversation';

const user = { _id: '1', fName: 'user 1', lName: 'test 1' };
const otherUser = { _id: '2', fName: 'user 2', lName: 'test 2' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('socket.io-client', () => {
  const socket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
  };
  return jest.fn(() => socket);
});

it('renders messages', () => {
  const conversation = {
    messages: [
      { content: 'hello', author: otherUser },
      { content: 'world', author: otherUser },
    ],
  };
  render(<Conversation conversation={conversation} />);

  conversation.messages.forEach((m) => {
    expect(screen.getByText(m.content, { exact: false })).toBeInTheDocument();
  });
});

it('renders message input fields', () => {
  render(<Conversation />);

  expect(screen.getByRole('textbox', { name: 'message' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
});

it('sends valid message through socket', async () => {
  const conversation = { _id: '1', messages: [] };
  render(<Conversation conversation={conversation} />);
  userEvent.type(screen.getByRole('textbox', { name: 'message' }), 'test');
  userEvent.click(screen.getByRole('button', { name: 'send' }));
  const socket = io();
  await waitFor(() => expect(socket.emit).toHaveBeenCalledTimes(1));
});
