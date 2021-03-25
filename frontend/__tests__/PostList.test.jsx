import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostList from '../components/PostList';

const posts = [1, 2, 3, 4].map((n) => ({
  content: `content ${n}`,
  createdAt: Date.now(),
  author: {
    _id: `${n}`,
    fName: `user ${n}`,
    lName: `test ${n}`,
  },
}));

it('renders posts', () => {
  render(<PostList posts={posts} renderItem={(p) => <PostList.Item post={p} />} loading={false} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);

  posts.forEach((post) => {
    expect(screen.getByText(`${post.author.fName} ${post.author.lName}`)).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
  });
});

it('calls onDelete when delete button is clicked', async () => {
  const handleDelete = jest.fn();

  render(
    <PostList
      posts={posts}
      renderItem={(p) => <PostList.Item post={p} onDelete={handleDelete} />}
      loading={false}
    />
  );

  screen.getAllByRole('button', { name: 'delete' }).forEach((button) => userEvent.click(button));
  await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(0));
});
