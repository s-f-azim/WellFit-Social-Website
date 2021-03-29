import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportButton from '../components/userComponents/ReportButton';

import { createReport } from '../actions/request';

jest.mock('../actions/request', () => ({
  createReport: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it('renders button', () => {
  render(<ReportButton />);

  expect(screen.getByRole('button', { name: 'report' })).toBeInTheDocument();
});

it('reports user when clicked', async () => {
  render(<ReportButton />);

  userEvent.click(screen.getByRole('button', { name: 'report' }));
  await waitFor(() => expect(createReport).toHaveBeenCalledTimes(1));
});
