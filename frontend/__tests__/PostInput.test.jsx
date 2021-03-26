import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostInput from '../components/PostInput';

jest.mock('react-player/lazy', () => ({
  canPlay: () => true,
}));

it('renders fields', () => {
  render(<PostInput />);
  expect(screen.getByRole('textbox', { name: 'content' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'videoUrl' })).toBeInTheDocument();
});

it('calls onSubmit when submitted with valid data', async () => {
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
  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({ content: 'test', videoUrl: 'test' })
  );
});

it('does not call onSubmit when submitted with invalid data', async () => {
  const handleSubmit = jest.fn();
  render(<PostInput onSubmit={handleSubmit} />);

  const postButton = screen.getByRole('button', { name: 'post' });
  userEvent.click(postButton);

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
});
