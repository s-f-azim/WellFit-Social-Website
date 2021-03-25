import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserFeed from '../components/UserFeed';
import { createPost, getFeedPosts, deletePost } from '../actions/post';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('../actions/post', () => ({
  createPost: jest.fn(),
  getFeedPosts: jest.fn(),
  deletePosts: jest.fn(),
}));

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

it('renders post to list when post is submitted', async () => {
  const post = { content: 'test' };
  createPost.mockReturnValueOnce({ _id: '1', content: post.content, author: user });
  getFeedPosts.mockReturnValue([]);

  render(<UserFeed />);

  userEvent.type(screen.getByRole('textbox', { name: 'content' }), post.content);
  userEvent.click(screen.getByRole('button', { name: 'post' }));

  await waitFor(() => expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(1));
});
