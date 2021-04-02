import { render, screen, act, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from '../pages/users/[id]';


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


const user = { _id: '1', fName: 'John', lName: 'Wick', following:['2'], qualifications:[], speciality:'', communicationModes:[], paymentFrequency:[], paymentOptions:[], serviceFormat:[], verified:false, gender:'Male', role:'client', trainerType:'', follower:[]};

const user2 = { _id: '14', fName: 'Alex', lName: 'Mason', following:[], qualifications:[], speciality:'', communicationModes:[], paymentFrequency:[], paymentOptions:[], serviceFormat:[], verified:true, gender:'Male', role:'instructor', trainerType:'', follower:[]};


it("renders client profile", async() => {
	await act(async () => {
    render(<UserProfile user = {user} />);
  });
  screen.getByText('John Wick', { exact: false }) // display name
  screen.getByText('Unverified User') // verified = false
  screen.getByText('Client') // role
  screen.getByText('No bio entered, edit your profile to display it', { exact: false })
  screen.getByText('Follows 1 other user(s)', { exact: false })
  screen.getByText('Followed by 0 user(s)', { exact: false })
});



it("render other users profile", async() => {
	await act(async () => {
    render(<UserProfile user = {user2} />);
  });
  screen.getByText('Alex Mason', { exact: false }) // Correct display name loaded
  screen.getByText("Report", {exact: false})	// Report button present on different user profiles
  screen.getByText("Follow") // Follow button present on different user profiles
  screen.getByText('Instructor') // correct role
});
