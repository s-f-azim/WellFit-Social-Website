import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import InstQuest from '../components/userComponents/questionnaires/InstQuest';

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
  render(<InstQuest session={session} />);

  userEvent.click(screen.getByRole('button', { name: 'right Your career' }));
  expect(screen.getByRole('combobox', { name: 'trainer type' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'add qualification' }));
  expect(screen.getByRole('textbox', { name: 'qualification' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'speciality' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'add customer story' }));
  expect(screen.getByRole('textbox', { name: 'customer story' })).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: 'right Client Communication (if applicable)' })
  );
  expect(screen.getByRole('listbox', { name: 'communication modes' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'communication frequency' })).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', { name: 'right Payment information (if applicable)' })
  );
  expect(screen.getByRole('combobox', { name: 'payment frequency' })).toBeInTheDocument();
  expect(screen.getByRole('listbox', { name: 'payment options' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'right Additional information' }));
  expect(screen.getByRole('listbox', { name: 'service format' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'client gender' })).toBeInTheDocument();
  // expect(screen.getByRole('slider', { name: 'client fitness' })).toBeInTheDocument();
  // expect(screen.getByRole('slider', { name: 'client hypertrophy' })).toBeInTheDocument();
  // expect(screen.getByRole('slider', { name: 'client strength' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
});

it.only('updates user when submitted with valid data', async () => {
  const session = { user: {} };
  updateUser.mockReturnValue({ data: { success: true, data: {} } });
  render(<InstQuest session={session} />);

  const user = {
    trainerType: 'Lifestyle trainer',
    speciality: 'Nutrition',
    communicationModes: ['Email', 'Phone calls', 'Whatsapp'],
    communicationFrequency: 'Daily',
    paymentFrequency: 'One time',
    paymentOptions: ['Paypal', 'Cash'],
    serviceFormat: ['Non-client-specific videos'],
    clientGenderPreference: 'Female',
  };

  userEvent.click(screen.getByRole('button', { name: 'right Your career' }));
  userEvent.selectOptions(screen.getByRole('combobox', { name: 'trainer type' }), user.trainerType);
  userEvent.type(screen.getByRole('textbox', { name: 'speciality' }), user.speciality);

  userEvent.click(
    screen.getByRole('button', { name: 'right Client Communication (if applicable)' })
  );
  userEvent.selectOptions(
    screen.getByRole('listbox', { name: 'communication modes' }),
    user.communicationModes
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'communication frequency' }),
    user.communicationFrequency
  );

  userEvent.click(
    screen.getByRole('button', { name: 'right Payment information (if applicable)' })
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'payment frequency' }),
    user.paymentFrequency
  );
  userEvent.selectOptions(
    screen.getByRole('listbox', { name: 'payment options' }),
    user.paymentOptions
  );

  userEvent.click(screen.getByRole('button', { name: 'right Additional information' }));
  userEvent.selectOptions(
    screen.getByRole('listbox', { name: 'service format' }),
    user.serviceFormat
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'client gender' }),
    user.clientGenderPreference
  );

  userEvent.click(screen.getByRole('button', { name: 'save' }));
  await waitFor(() => expect(updateUser).toHaveBeenCalledWith(user));
});
