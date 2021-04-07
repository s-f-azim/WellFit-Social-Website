import { render, screen, act } from '@testing-library/react';
import UserProfile from '../pages/users/[id]';

const user = {
  _id: '1',
  fName: 'John',
  lName: 'Wick',
  following: [],
  qualifications: [],
  speciality: '',
  communicationModes: [],
  paymentFrequency: [],
  paymentOptions: [],
  serviceFormat: [],
  verified: false,
  gender: 'Male',
  role: 'client',
  trainerType: '',
  follower: [],
  photos: [],
};

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('renders client profile', async () => {
  await act(async () => {
    render(<UserProfile user={user} />);
  });
  expect(screen.getByText('John Wick', { exact: false })).toBeInTheDocument(); // display name
  expect(screen.getByText('Unverified User')).toBeInTheDocument(); // verified = false
  expect(screen.getByText('Client')).toBeInTheDocument(); // role
  expect(
    screen.getByText('No bio entered, edit your profile to display it', { exact: false })
  ).toBeInTheDocument();
  expect(screen.getByText('Follows 0 other user(s)', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('Followed by 0 user(s)', { exact: false })).toBeInTheDocument();
});
