import { render } from '@testing-library/react';
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

const user2 = {
  _id: '14',
  fName: 'Alex',
  lName: 'Mason',
  following: [],
  qualifications: [],
  speciality: '',
  communicationModes: [],
  paymentFrequency: [],
  paymentOptions: [],
  serviceFormat: [],
  verified: true,
  gender: 'Male',
  role: 'instructor',
  trainerType: '',
  follower: [],
};

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

it('render other users profile', async () => {
  const { getByText } = render(<UserProfile user={user2} />);
  getByText('Alex Mason', { exact: false }); // Correct display name loaded
  getByText('Report', { exact: false }); // Report button present on different user profiles
  getByText('Follow'); // Follow button present on different user profiles
  getByText('Instructor'); // correct role
});
