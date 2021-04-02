import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPosts from '../components/userComponents/postComponents/UserPosts';
import { getPostsByAuthor } from '../actions/post';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../actions/post', () => ({
  getPostsByAuthor: jest.fn(),
  deletePost: jest.fn(),
}));

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

it('renders posts', async () => {
  getPostsByAuthor.mockReturnValueOnce(posts);
  render(<UserPosts />);

  await waitFor(() =>
    expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(posts.length)
  );

  posts.forEach((post) => {
    expect(screen.getByText(`${post.author.fName} ${post.author.lName}`)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });
});

it('deletes post when delete button is clicked', async () => {
  getPostsByAuthor.mockReturnValueOnce(posts);
  render(<UserPosts />);

  await waitFor(() =>
    expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(posts.length)
  );

  userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
  userEvent.click(screen.getByText('Yes'));

  await waitFor(() =>
    expect(screen.getAllByRole('listitem', { name: 'post' })).toHaveLength(posts.length - 1)
  );
});
