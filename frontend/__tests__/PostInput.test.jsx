import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostInput from '../components/PostInput';

jest.mock('react-player/lazy', () => ({
  canPlay: () => true,
}));

it('renders the fields', () => {
  render(<PostInput />);
  expect(screen.getByRole('textbox', { name: 'content' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'videoUrl' })).toBeInTheDocument();
});

it('calls onSubmit when form is submitted with valid data', async () => {
  const handleSubmit = jest.fn();
  render(<PostInput onSubmit={handleSubmit} />);

  const contentField = screen.getByRole('textbox', { name: 'content' });
  const videoUrlField = screen.getByRole('textbox', { name: 'videoUrl' });
  const postButton = screen.getByRole('button', { name: 'post' });

  userEvent.type(contentField, 'test');
  expect(contentField).toHaveTextContent('test');

  userEvent.type(videoUrlField, 'test');
  expect(videoUrlField).toHaveValue('test');

  userEvent.click(postButton);
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
});
