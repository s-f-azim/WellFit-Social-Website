import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Review } from '../components/userComponents/reviewComponents/Review';

const user = { _id: '1', fName: 'user', lName: 'test', photos: [] };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

it('renders fetched reviews', async () => {
  const reviews = [1, 2, 3, 4, 5].map((n) => ({
    _id: `${n}`,
    rate: `${n}`,
    comment: `comment ${n}`,
    createdAt: Date.now(),
    author: {
      _id: `${n}`,
      fName: `user ${n}`,
      lName: `test ${n}`,
      photos: [],
    },
  }));
  const getReviews = jest.fn(() => reviews);

  render(<Review getReviews={getReviews} />);

  await waitFor(() => expect(getReviews).toHaveBeenCalledTimes(1));
  reviews.forEach((review) => {
    expect(
      screen.getByText(`${review.author.fName} ${review.author.lName}`, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});

it('renders with no reviews', async () => {
  const getReviews = jest.fn(() => []);

  render(<Review getReviews={getReviews} />);

  await waitFor(() => expect(getReviews).toHaveBeenCalledTimes(1));
  expect(screen.getByText(/no data/i)).toBeInTheDocument();
});

it('creates review when submitted with valid data', async () => {
  const getReviews = () => [];
  const review = { _id: '1', rate: 1, comment: 'comment', author: user };
  const handleSubmit = jest.fn(() => ({ data: { data: review } }));
  render(<Review getReviews={getReviews} onSubmit={handleSubmit} />);

  userEvent.click(screen.getAllByRole('radio')[0]);

  const commentField = screen.getByRole('textbox', { name: 'comment' });
  userEvent.type(commentField, review.comment);
  expect(commentField).toHaveValue(review.comment);

  const reviewButton = screen.getByRole('button', { name: 'review' });
  userEvent.click(reviewButton);
  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({ rate: review.rate, comment: review.comment })
  );
  expect(
    screen.getByText(`${review.author.fName} ${review.author.lName}`, { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText(review.comment)).toBeInTheDocument();
});

it('does not create review when submitted with invalid data', async () => {
  const review = { _id: '1', rate: 1, comment: 'comment', author: user };
  const getReviews = () => [];
  const handleSubmit = jest.fn(() => ({ data: { data: review } }));
  render(<Review getReviews={getReviews} onSubmit={handleSubmit} />);

  const commentField = screen.getByRole('textbox', { name: 'comment' });
  userEvent.type(commentField, review.comment);
  expect(commentField).toHaveValue(review.comment);

  const reviewButton = screen.getByRole('button', { name: 'review' });
  userEvent.click(reviewButton);

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));
  await waitFor(() =>
    expect(screen.queryAllByRole('listitem', { name: 'review' })).toHaveLength(0)
  );
});

it('deletes review when delete button is clicked', async () => {
  const review = { _id: '1', rate: 1, comment: 'comment', author: user };
  const getReviews = () => [review];
  const handleDelete = jest.fn();

  render(<Review getReviews={getReviews} onDelete={handleDelete} />);
  await waitFor(() => expect(screen.getAllByRole('listitem', { name: 'review' })).toHaveLength(1));

  userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
  userEvent.click(screen.getByText('Yes'));

  await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(screen.queryAllByRole('listitem', { name: 'review' })).toHaveLength(0)
  );
});
