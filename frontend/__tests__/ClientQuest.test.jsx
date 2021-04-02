import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import ClientQuest from '../components/userComponents/questionnaires/clientQuest';

import updateUser from '../actions/user';

jest.mock('../actions/user');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fields', () => {
  const session = { user: {} };
  render(<ClientQuest session={session} />);

  userEvent.click(screen.getByRole('button', { name: 'right Personal information' }));
  expect(screen.getByRole('spinbutton', { name: 'weight' })).toBeInTheDocument();
  expect(screen.getByRole('spinbutton', { name: 'height' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'fitness level' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'right Preferences' }));
  expect(screen.getByRole('combobox', { name: 'instructor gender' })).toBeInTheDocument();
  expect(screen.getByRole('spinbutton', { name: 'training duration' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'right Additional information' }));
  expect(screen.getByRole('combobox', { name: 'training equipment' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
});

it('updates user when submitted with valid data', async () => {
  const session = { user: {} };
  updateUser.mockReturnValue({ data: { success: true, data: {} } });
  render(<ClientQuest session={session} />);

  const user = {
    weight: 60,
    height: 160,
    fitnessLevel: 'beginner',
    preferredGender: 'male',
    trainingDuration: 45,
    trainingEquipment: ['barbells', 'dumbbells'],
  };

  userEvent.click(screen.getByRole('button', { name: 'right Personal information' }));
  userEvent.type(screen.getByRole('spinbutton', { name: 'weight' }), `${user.weight}`);
  userEvent.type(screen.getByRole('spinbutton', { name: 'height' }), `${user.height}`);
  userEvent.click(screen.getByRole('combobox', { name: 'fitness level' }));
  userEvent.click(screen.getByText('Beginner'));

  userEvent.click(screen.getByRole('button', { name: 'right Preferences' }));
  userEvent.click(screen.getByRole('combobox', { name: 'instructor gender' }));
  userEvent.click(screen.getByText('Male'));
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'training duration' }),
    `${user.trainingDuration}`
  );

  userEvent.click(screen.getByRole('button', { name: 'right Additional information' }));
  userEvent.click(screen.getByRole('combobox', { name: 'training equipment' }));
  userEvent.click(screen.getByText('Barbells'));
  userEvent.click(screen.getByText('Dumbbells'));

  userEvent.click(screen.getByRole('button', { name: 'save' }));
  await waitFor(() => expect(updateUser).toHaveBeenCalledWith(user));
});

it('does not update user when submitted with invalid data', async () => {
  const session = { user: {} };
  updateUser.mockReturnValue({ data: { success: false, data: {} } });
  render(<ClientQuest session={session} />);

  const user = {
    weight: -10,
    height: -10,
    fitnessLevel: 'beginner',
    preferredGender: 'male',
    trainingDuration: -45,
    trainingEquipment: ['barbells', 'dumbbells'],
  };

  userEvent.click(screen.getByRole('button', { name: 'right Personal information' }));
  userEvent.type(screen.getByRole('spinbutton', { name: 'weight' }), `${user.weight}`);
  userEvent.type(screen.getByRole('spinbutton', { name: 'height' }), `${user.height}`);
  userEvent.click(screen.getByRole('combobox', { name: 'fitness level' }));
  userEvent.click(screen.getByText('Beginner'));

  userEvent.click(screen.getByRole('button', { name: 'right Preferences' }));
  userEvent.click(screen.getByRole('combobox', { name: 'instructor gender' }));
  userEvent.click(screen.getByText('Male'));
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'training duration' }),
    `${user.trainingDuration}`
  );

  userEvent.click(screen.getByRole('button', { name: 'right Additional information' }));
  userEvent.click(screen.getByRole('combobox', { name: 'training equipment' }));
  userEvent.click(screen.getByText('Barbells'));
  userEvent.click(screen.getByText('Dumbbells'));

  userEvent.click(screen.getByRole('button', { name: 'save' }));
  await waitFor(() => expect(updateUser).toHaveBeenCalledTimes(0));
});
