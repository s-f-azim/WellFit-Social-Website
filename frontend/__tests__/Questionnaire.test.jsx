<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';
import Questionnaire from '../components/userComponents/questionnaires/Questionnaire';
=======
import { render, screen } from '@testing-library/react';
import Questionnaire from '../components/Questionnaire';
>>>>>>> main

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
