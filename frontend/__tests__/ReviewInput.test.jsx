import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewInput from '../components/userComponents/reviewComponents/ReviewInput';

it('renders fields', () => {
  render(<ReviewInput />);
  expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'comment' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'review' })).toBeInTheDocument();
});

it('calls onSubmit when submitted with valid data', async () => {
  const handleSubmit = jest.fn();
  render(<ReviewInput onSubmit={handleSubmit} />);

  const commentField = screen.getByRole('textbox', { name: 'comment' });
  const reviewButton = screen.getByRole('button', { name: 'review' });

  userEvent.click(screen.getAllByRole('radio')[0]);

  userEvent.type(commentField, 'test');
  expect(commentField).toHaveValue('test');

  userEvent.click(reviewButton);
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ rate: 1, comment: 'test' }));

  userEvent.click(screen.getAllByRole('radio')[4]);
  userEvent.click(reviewButton);
  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({ rate: 5, comment: 'test' }));
});

it('does not call onSubmit when submitted with invalid data', async () => {
  const handleSubmit = jest.fn();
  render(<ReviewInput onSubmit={handleSubmit} />);

  userEvent.click(screen.getByRole('button', { name: 'review' }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
});
