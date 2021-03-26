import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserFeed from '../components/UserFeed';
import { createPost, getFeedPosts } from '../actions/post';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../actions/post', () => ({
  createPost: jest.fn(),
  getFeedPosts: jest.fn(),
  deletePost: jest.fn(),
}));

it('renders post to list when post is submitted', async () => {
  const post = { _id: '1', content: 'content', author: user };
  createPost.mockReturnValueOnce(post);
  getFeedPosts.mockReturnValue([]);

  render(<UserFeed />);

  userEvent.type(screen.getByRole('textbox', { name: 'content' }), post.content);
  userEvent.click(screen.getByRole('button', { name: 'post' }));

  await waitFor(() => expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(1));
});

it('deletes post when delete button is clicked', async () => {
  const post = { _id: '1', content: 'content', author: user };
  getFeedPosts.mockReturnValue([post]);

  render(<UserFeed />);
  await waitFor(() => expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(1));

  userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
  userEvent.click(screen.getByText('Yes'));

  await waitFor(() =>
    expect(screen.queryByRole('listitem', { name: 'post' })).not.toBeInTheDocument()
  );
});
