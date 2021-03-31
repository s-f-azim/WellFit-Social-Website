/* eslint-disable no-underscore-dangle */
import { render, screen, waitFor } from '@testing-library/react';
import Router from 'next/router';
import { useSession } from 'next-auth/client';
import Home from '../../pages/index';

jest.mock('next-auth/client', () => ({
  useSession: jest.fn(),
}));

jest.spyOn(Router, 'push').mockImplementation(() => jest.fn());

jest.mock('../../components/generalComponents/LandingPage/banner-4');

it('renders application', () => {
  useSession.mockReturnValue([null, false]);
  render(<Home />);
  expect(screen.getByText('Join WellFit', { exact: false })).toBeInTheDocument();
});

it('redirects to profile if user logged in', async () => {
  const user = { _id: '1', fName: 'user', lName: 'test', role: 'client' };
  useSession.mockReturnValue([{ user }, false]);
  render(<Home />);
  await waitFor(() => expect(Router.push).toHaveBeenCalledWith(`/users/${user._id}`));
});

it('redirects to admin dashboard if admin logged in', async () => {
  const user = { _id: '1', fName: 'user', lName: 'test', role: 'admin' };
  useSession.mockReturnValue([{ user }, false]);
  render(<Home />);
  await waitFor(() => expect(Router.push).toHaveBeenCalledWith('/adminDashboard'));
});
