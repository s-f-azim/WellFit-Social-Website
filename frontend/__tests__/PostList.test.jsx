import { render, waitFor } from '@testing-library/react';
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
  const { getByText, getAllByRole } = render(
    <PostList posts={posts} renderItem={(p) => <PostList.Item post={p} />} loading={false} />
  );

  expect(getAllByRole('listitem')).toHaveLength(posts.length);

  posts.forEach((post) => {
    expect(getByText(`${post.author.fName} ${post.author.lName}`)).toBeInTheDocument();
    expect(getByText(post.content)).toBeInTheDocument();
  });
});

it('calls onDelete when delete button is clicked', async () => {
  const handleDelete = jest.fn();

  const { getAllByRole } = render(
    <PostList
      posts={posts}
      renderItem={(p) => <PostList.Item post={p} onDelete={handleDelete} />}
      loading={false}
    />
  );

  getAllByRole('button', { name: 'delete' }).forEach((button) => userEvent.click(button));
  await waitFor(() => expect(handleDelete).toHaveBeenCalledTimes(0));
});
