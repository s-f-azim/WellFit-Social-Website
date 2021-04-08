import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import ProfileCard from '../../../../components/generalComponents/Search/ProfileCard';

const instructor = {
  _id: '1',
  fName: 'firstName',
  lName: `lastName`,
  email: `instructor1@test.com`,
  photos: [],
  role: 'instructor',
  tags: ['Cycling', 'Cardio'],
  following: ['2', '3', '4'],
  follower: [],
};

const client = {
  _id: '2',
  fName: 'firstName',
  lName: `lastName`,
  email: `client1@test.com`,
  photos: [],
  role: 'client',
  tags: [],
  following: [],
  follower: ['1'],
};

it('renders instructor profile card correctly', async () => {
  render(<ProfileCard content={instructor} />);

  expect(screen.getByText(instructor.fName, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(instructor.lName, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(instructor.role, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(instructor.tags[0], { exact: false })).toBeInTheDocument();
  expect(screen.getByText(instructor.tags[1], { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Followed by 0 user(s)', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Follows 3 other user(s)', { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToProfilePage' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToProfilePage' })).toHaveAttribute('href', '/users/1');
});

it('renders client profile card correctly', async () => {
  render(<ProfileCard content={client} />);

  expect(screen.getByText(client.fName, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(client.lName, { exact: false })).toBeInTheDocument();
  expect(screen.getByText(client.role, { exact: false })).toBeInTheDocument();
  expect(screen.getByText('None specified', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Followed by 1 user(s)', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Follows 0 other user(s)', { exact: false })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToProfilePage' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'goToProfilePage' })).toHaveAttribute('href', '/users/2');
});
