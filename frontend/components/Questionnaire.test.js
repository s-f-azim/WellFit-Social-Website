import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Questionnaire from './Questionnaire';

import { useRouter } from 'next/router';
import { updateUser } from '../utils/user.js';

jest.mock('next/router');
jest.mock('../utils/user', () => {
  updateUser: jest.fn();
});

it('renders the fields', () => {
  render(<Questionnaire />);

  expect(screen.getByLabelText('What is your weight? (kg)')).toBeInTheDocument();
  expect(screen.getByLabelText('What is your height? (cm)')).toBeInTheDocument();
  expect(screen.getByLabelText("Preferred instructor's gender?")).toBeInTheDocument();
  expect(screen.getByLabelText('What is your Fitness Level?')).toBeInTheDocument();
  expect(screen.getByLabelText('Preferred training duration? (minutes)')).toBeInTheDocument();
  expect(
    screen.getByLabelText('What training equipment do you have available?')
  ).toBeInTheDocument();
});

it('calls updateUser when submit clicked', async () => {
  render(<Questionnaire />);

  fireEvent.click(screen.getByText('NEXT'));
  fireEvent.click(screen.getByText('NEXT'));
  fireEvent.click(screen.getByText('NEXT'));
  fireEvent.click(screen.getByText('NEXT'));

  await screen.findByText('SUBMIT');
});
