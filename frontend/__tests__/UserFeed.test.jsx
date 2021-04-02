import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserFeed from '../components/userComponents/postComponents/UserFeed';
import { createPost, getFeedPosts, deletePost } from '../actions/post';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../actions/post', () => ({
  createPost: jest.fn(),
  getFeedPosts: jest.fn(),
  deletePost: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fetched posts', async () => {
  const posts = [1, 2, 3, 4].map((n) => ({
    _id: `${n}`,
    content: `content ${n}`,
    createdAt: Date.now(),
    author: {
      _id: `${n}`,
      fName: `user ${n}`,
      lName: `test ${n}`,
    },
  }));
  getFeedPosts.mockReturnValue(posts);

  render(<UserFeed />);

  await waitFor(() => expect(getFeedPosts).toHaveBeenCalledTimes(1));
  posts.forEach((post) => {
    expect(screen.getByText(`${post.author.fName} ${post.author.lName}`)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });
});

it('creates post when submitted with valid data', async () => {
  const post = { _id: '1', content: 'content', author: user };
  createPost.mockReturnValueOnce(post);
  getFeedPosts.mockReturnValue([]);

  render(<UserFeed />);

  userEvent.type(screen.getByRole('textbox', { name: 'content' }), post.content);
  userEvent.click(screen.getByRole('button', { name: 'post' }));

  await waitFor(() => expect(createPost).toHaveBeenCalledWith({ content: post.content }));
  expect(screen.getByText(`${post.author.fName} ${post.author.lName}`)).toBeInTheDocument();
  expect(screen.getByText(post.content)).toBeInTheDocument();
});

it('does not create post when submitted with invalid data', async () => {
  const post = { _id: '1', content: 'content', author: user };
  createPost.mockReturnValueOnce(post);
  getFeedPosts.mockReturnValue([]);

  render(<UserFeed />);

  userEvent.click(screen.getByRole('button', { name: 'post' }));

  await waitFor(() => expect(createPost).toHaveBeenCalledTimes(0));
  await waitFor(() => expect(screen.queryAllByRole('listitem', { name: 'post' })).toHaveLength(0));
});

it('deletes post when delete button is clicked', async () => {
  const post = { _id: '1', content: 'content', author: user };
  getFeedPosts.mockReturnValue([post]);

  render(<UserFeed />);
  await waitFor(() => expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(1));

  userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
  userEvent.click(screen.getByText('Yes'));

  await waitFor(() => expect(deletePost).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(screen.queryByRole('listitem', { name: 'post' })).not.toBeInTheDocument()
  );
});
