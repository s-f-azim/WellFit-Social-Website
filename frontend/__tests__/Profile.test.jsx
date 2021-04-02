import { render, screen, act } from '@testing-library/react';
import UserProfile from '../pages/users/[id]';

const user = {
  _id: '1',
  fName: 'John',
  lName: 'Wick',
  following: ['2'],
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
};

// const user2 = {
//   _id: '14',
//   fName: 'Alex',
//   lName: 'Mason',
//   following: [],
//   qualifications: [],
//   speciality: '',
//   communicationModes: [],
//   paymentFrequency: [],
//   paymentOptions: [],
//   serviceFormat: [],
//   verified: true,
//   gender: 'Male',
//   role: 'instructor',
//   trainerType: '',
//   follower: [],
// };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('renders client profile', async () => {
  await act(async () => {
    render(<UserProfile user={user} />);
  });
  screen.getByText('John Wick', { exact: false }); // display name
  screen.getByText('Unverified User'); // verified = false
  screen.getByText('Client'); // role
  screen.getByText('No bio entered, edit your profile to display it', { exact: false });
  screen.getByText('Follows 1 other user(s)', { exact: false });
  screen.getByText('Followed by 0 user(s)', { exact: false });
});
