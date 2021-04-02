import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  expect(screen.getByRole('spinbutton', { name: 'years experience' })).toBeInTheDocument();

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
  expect(screen.getAllByRole('slider', { name: 'client fitness' })).not.toBeNull();
  expect(screen.getAllByRole('slider', { name: 'client hypertrophy' })).not.toBeNull();
  expect(screen.getAllByRole('slider', { name: 'client strength' })).not.toBeNull();

  expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
});

it('updates user when submitted with valid data', async () => {
  const session = { user: {} };
  updateUser.mockReturnValue({ data: { success: true, data: {} } });
  render(<InstQuest session={session} />);

  const user = {
    trainerType: 'Lifestyle trainer',
    qualifications: [1, 2, 3].map((n) => `qualification ${n}`),
    speciality: 'Nutrition',
    customerStories: [1, 2].map((n) => `customer story ${n}`),
    yearsExperience: 3,
    communicationModes: ['Email', 'Phone calls', 'Whatsapp'],
    communicationFrequency: 'Daily',
    paymentFrequency: 'One time',
    paymentOptions: ['Paypal', 'Cash'],
    serviceFormat: ['Non-client-specific videos'],
    clientGenderPreference: 'Female',
    clientFitness: [5, 60],
    clientHypertrophy: [50, 85],
    clientStrength: [34, 46],
  };

  userEvent.click(screen.getByRole('button', { name: 'right Your career' }));
  userEvent.selectOptions(screen.getByRole('combobox', { name: 'trainer type' }), user.trainerType);
  user.qualifications.forEach(() => {
    userEvent.click(screen.getByRole('button', { name: 'add qualification' }));
  });
  screen.getAllByRole('textbox', { name: 'qualification' }).forEach((textbox, index) => {
    userEvent.type(textbox, user.qualifications[index]);
  });
  userEvent.type(screen.getByRole('textbox', { name: 'speciality' }), user.speciality);
  user.customerStories.forEach(() => {
    userEvent.click(screen.getByRole('button', { name: 'add customer story' }));
  });
  screen.getAllByRole('textbox', { name: 'customer story' }).forEach((textbox, index) => {
    userEvent.type(textbox, user.customerStories[index]);
  });
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'years experience' }),
    `${user.yearsExperience}`
  );

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
  screen.getAllByRole('slider', { name: 'client fitness' }).forEach((slider, index) => {
    fireEvent.change(slider, { target: { value: user.clientFitness[index] } });
  });
  screen.getAllByRole('slider', { name: 'client hypertrophy' }).forEach((slider, index) => {
    fireEvent.change(slider, { target: { value: user.clientHypertrophy[index] } });
  });
  screen.getAllByRole('slider', { name: 'client strength' }).forEach((slider, index) => {
    fireEvent.change(slider, { target: { value: user.clientStrength[index] } });
  });

  userEvent.click(screen.getByRole('button', { name: 'save' }));
  await waitFor(() => expect(updateUser).toHaveBeenCalledWith(user));
});
