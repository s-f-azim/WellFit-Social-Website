import { render, screen, act } from '@testing-library/react';
import SuggestedInstructors from '../../../components/userComponents/SuggestedInstructors';

import { getSuggestedInstructors } from '../../../actions/user';

const instructors = [1, 2, 3, 4].map((n) => ({
  _id: `${n}`,
  fName: `instructor ${n}`,
  lName: `test ${n}`,
  email: `email ${n}`,
}));

jest.mock('../../../actions/user', () => ({
  getSuggestedInstructors: jest.fn(),
}));

it('renders suggested instructors', async () => {
  getSuggestedInstructors.mockReturnValueOnce({
    data: { success: true, data: instructors },
  });
  await act(async () => {
    render(<SuggestedInstructors />);
  });

  instructors.forEach((i) => {
    expect(screen.getByText(i.fName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(i.lName, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(i.email, { exact: false })).toBeInTheDocument();
  });
});
