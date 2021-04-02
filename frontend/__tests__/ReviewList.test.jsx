import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewList from '../components/userComponents/reviewComponents/ReviewList';

const reviews = [1, 2, 3, 4, 5].map((n) => ({
  _id: `${n}`,
  rate: `${n}`,
  comment: `comment ${n}`,
  createdAt: Date.now(),
  author: {
    _id: `${n}`,
    fName: `user ${n}`,
    lName: `test ${n}`,
  },
}));

it('renders reviews', () => {
  render(
    <ReviewList
      reviews={reviews}
      renderItem={(r) => <ReviewList.Item review={r} />}
      loading={false}
    />
  );

  expect(screen.getAllByRole('listitem', { name: 'review' })).toHaveLength(reviews.length);

  reviews.forEach((review) => {
    expect(screen.getByText(`${review.author.fName} ${review.author.lName}`)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});

it('calls onDelete when delete button is clicked', async () => {
  const handleDelete = jest.fn();

  render(
    <ReviewList
      reviews={reviews}
      renderItem={(p) => <ReviewList.Item review={p} onDelete={handleDelete} />}
      loading={false}
    />
  );

  userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
  userEvent.click(screen.getByText('Yes'));
  await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(1));
});
