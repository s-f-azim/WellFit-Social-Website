import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { notification } from 'antd';
import CourseForm from '../../../../components/userComponents/courseComponents/CourseForm';

import createCourse from '../../../../actions/course';

const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

jest.mock('../../../../actions/course');

jest.mock('../../../../actions/user', () => ({
  getUserIdByEmail: (email) => email,
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

afterEach(() => {
  jest.clearAllMocks();
});

it('renders fields', () => {
  render(<CourseForm />);

  expect(screen.getByRole('textbox', { name: 'title' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'description' })).toBeInTheDocument();
  expect(screen.getByRole('spinbutton', { name: 'price' })).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'add creator' }));
  expect(screen.getByRole('textbox', { name: 'creator' })).toBeInTheDocument();
  expect(screen.getByRole('listbox', { name: 'tags' })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: 'fitness level' })).toBeInTheDocument();
  expect(screen.getByRole('spinbutton', { name: 'training duration' })).toBeInTheDocument();
  expect(screen.getAllByRole('radio', { name: 'Yes' })).not.toBeNull();
  expect(screen.getAllByRole('radio', { name: 'No' })).not.toBeNull();
  expect(screen.getByRole('listbox', { name: 'training equipment' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'address' })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'create' })).toBeInTheDocument();
});

it('creates course when submitted with valid data', async () => {
  createCourse.mockReturnValue({ success: true, data: {} });
  render(<CourseForm />);

  const course = {
    title: 'course test',
    description: 'description test',
    price: 45,
    creators: [1, 2, 3].map((n) => `creator${n}@email.com`),
    tags: ['FitLife', 'GymTime', 'Weights'],
    fitnessLevel: 'advanced',
    trainingDuration: 120,
    isVirtual: true,
    gym: false,
    trainingEquipment: ['cardioMachines', 'battleRopes'],
    address: 'address test',
  };

  userEvent.type(screen.getByRole('textbox', { name: 'title' }), course.title);
  userEvent.type(screen.getByRole('textbox', { name: 'description' }), course.description);
  userEvent.type(screen.getByRole('spinbutton', { name: 'price' }), `${course.price}`);
  course.creators.forEach(() => {
    userEvent.click(screen.getByRole('button', { name: 'add creator' }));
  });
  screen.getAllByRole('textbox', { name: 'creator' }).forEach((textbox, index) => {
    userEvent.type(textbox, course.creators[index]);
  });
  userEvent.selectOptions(screen.getByRole('listbox', { name: 'tags' }), course.tags);
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'fitness level' }),
    course.fitnessLevel
  );
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'training duration' }),
    `${course.trainingDuration}`
  );
  userEvent.click(screen.getAllByRole('radio', { name: 'Yes' })[0]);
  userEvent.click(screen.getAllByRole('radio', { name: 'No' })[1]);
  userEvent.selectOptions(
    screen.getByRole('listbox', { name: 'training equipment' }),
    course.trainingEquipment
  );
  userEvent.type(screen.getByRole('textbox', { name: 'address' }), course.address);

  userEvent.click(screen.getByRole('button', { name: 'create' }));
  await waitFor(() => expect(createCourse).toHaveBeenCalledWith(course));
});

it('does not create course when submitted with invalid data', async () => {
  createCourse.mockReturnValue({ success: false, data: {} });
  render(<CourseForm />);

  const course = {
    title: 'course test',
    description: 'description test',
    price: -45,
    creators: [1, 2, 3].map((n) => `creator${n}@email`),
    tags: ['FitLife', 'GymTime', 'Weights'],
    fitnessLevel: 'advanced',
    trainingDuration: 120,
    isVirtual: true,
    gym: false,
    trainingEquipment: ['cardioMachines', 'battleRopes'],
    address: 'address test',
  };

  userEvent.type(screen.getByRole('textbox', { name: 'title' }), course.title);
  userEvent.type(screen.getByRole('textbox', { name: 'description' }), course.description);
  userEvent.type(screen.getByRole('spinbutton', { name: 'price' }), `${course.price}`);
  course.creators.forEach(() => {
    userEvent.click(screen.getByRole('button', { name: 'add creator' }));
  });
  screen.getAllByRole('textbox', { name: 'creator' }).forEach((textbox, index) => {
    userEvent.type(textbox, course.creators[index]);
  });
  userEvent.selectOptions(screen.getByRole('listbox', { name: 'tags' }), course.tags);
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'fitness level' }),
    course.fitnessLevel
  );
  userEvent.type(
    screen.getByRole('spinbutton', { name: 'training duration' }),
    `${course.trainingDuration}`
  );
  userEvent.click(screen.getAllByRole('radio', { name: 'Yes' })[0]);
  userEvent.click(screen.getAllByRole('radio', { name: 'No' })[1]);
  userEvent.selectOptions(
    screen.getByRole('listbox', { name: 'training equipment' }),
    course.trainingEquipment
  );
  userEvent.type(screen.getByRole('textbox', { name: 'address' }), course.address);

  userEvent.click(screen.getByRole('button', { name: 'create' }));
  await waitFor(() => expect(createCourse).toHaveBeenCalledTimes(0));
});
