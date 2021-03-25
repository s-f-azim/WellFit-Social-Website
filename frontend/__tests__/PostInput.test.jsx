import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostInput from '../components/PostInput';

jest.mock('react-player/lazy', () => ({
  canPlay: true,
}));

it('renders the fields', () => {
  render(<PostInput />);
  expect(screen.getByRole('textbox', { name: 'content' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'videoUrl' })).toBeInTheDocument();
});

it('calls onSubmit when form is submitted with valid data', async () => {
  const handleSubmit = jest.fn();
  render(<PostInput onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByRole('textbox', { name: 'content' }), { target: { value: 'test' } });
  expect(screen.getByRole('textbox', { name: 'content' })).toHaveTextContent('test');
  fireEvent.change(screen.getByRole('textbox', { name: 'videoUrl' }), {
    target: { value: 'test' },
  });

  fireEvent.submit(screen.getByRole('button', { name: 'post' }));
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
});
