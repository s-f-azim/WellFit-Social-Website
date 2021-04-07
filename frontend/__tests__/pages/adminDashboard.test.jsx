import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/client';
import { notification } from 'antd';
import { deleteRequest, acceptVerify } from '../../actions/request';
import AdminDashboard from '../../pages/adminDashboard';

const admin1 = { _id: '1', fName: 'admin', lName: '1', role: 'admin' };
const admin2 = { _id: '2', fName: 'admin', lName: '2', role: 'admin' };
const instructor1 = { _id: '3', fName: 'instructor', lName: '1', role: 'instructor' };
const instructor2 = { _id: '4', fName: 'instructor', lName: '2', role: 'instructor' };
const client1 = { _id: '5', fName: 'client', lName: '1', role: 'client' };
const client2 = { _id: '6', fName: 'client', lName: '2', role: 'client' };

const verifyRequest1 = { _id: '7', author: '3', type: 'verify', content: 'verifyTest1' };
const verifyRequest2 = { _id: '8', author: '4', type: 'verify', content: 'verifyTest2' };
const bugReport1 = { _id: '9', author: '5', type: 'bug', content: 'bugTest1' };
const bugReport2 = { _id: '10', author: '6', type: 'bug', content: 'bugTest2' };
const userReport1 = { _id: '11', author: '3', type: 'report', recipient: '5' };
const userReport2 = { _id: '12', author: '6', type: 'report', recipient: '4' };

let AdminDash;

jest.mock('next-auth/client', () => ({
  useSession: jest.fn(),
}));

jest.mock('../../actions/request', () => ({
  deleteRequest: jest.fn(),
  acceptVerify: jest.fn(),
}));

jest.spyOn(notification, 'open').mockImplementation(() => jest.fn());

beforeEach(() => {
  AdminDash = (
    <AdminDashboard
      userCount={6}
      users={[[admin1, admin2, instructor1, instructor2, client1, client2]]}
      adminCount={2}
      clientCount={2}
      instructorCount={2}
      bugReports={[bugReport1, bugReport2]}
      verifyRequests={[verifyRequest1, verifyRequest2]}
      userReports={[userReport1, userReport2]}
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

it('renders admin dashboard with correct numbers for the various types of request', () => {
  const user = admin1;
  useSession.mockReturnValue([{ user }, false]);
  render(AdminDash);
  expect(screen.getByText('Admin Dashboard', { exact: false })).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: 'bar-chart Statistics', selected: true, hidden: false })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: 'check-circle Verify users 2', selected: false, hidden: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: 'stop Ban/Delete users', selected: false, hidden: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: 'bug Bug reports 2', selected: false, hidden: true })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('tab', { name: 'dislike User reports 2', selected: false, hidden: true })
  ).toBeInTheDocument();

  // statistics tab details should be shown when navigating to the admin dashboard
  expect(screen.getByText('No. users', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. clients', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. instructors', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. admins', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. Bug reports', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. Verify requests', { exact: false })).toBeInTheDocument();
  expect(screen.getByText('No. User reports', { exact: false })).toBeInTheDocument();

  expect(screen.getByText('6', { exact: false })).toBeInTheDocument();
  expect(screen.getAllByText('2', { exact: false })).toHaveLength(9);
});

describe('unauthorised', () => {
  it('renders unauthorised page if no user', () => {
    useSession.mockReturnValue([null, false]);
    render(<AdminDashboard />);
    expect(screen.getByText('403', { exact: false })).toBeInTheDocument();
  });

  it('renders unauthorised page if user is an instructor', () => {
    const user = instructor1;
    useSession.mockReturnValue([{ user }, false]);
    render(<AdminDashboard />);
    expect(screen.getByText('403', { exact: false })).toBeInTheDocument();
  });

  it('renders unauthorised page if user is a client', () => {
    const user = client1;
    useSession.mockReturnValue([{ user }, false]);
    render(<AdminDashboard />);
    expect(screen.getByText('403', { exact: false })).toBeInTheDocument();
  });
});

describe('verify users', () => {
  it('renders verify requests when user clicks on Verify users tab', () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    expect(
      screen.getByRole('tab', { name: 'check-circle Verify users 2', selected: false })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: true })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: 'check-circle Verify users 2' }));

    expect(
      screen.getByRole('tab', { name: 'check-circle Verify users 2', selected: true })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: false })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: 'check' })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(screen.getByText('verifyTest1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('verifyTest2', { exact: false })).toBeInTheDocument();
  });

  it('clicking the tick for a verify request acceps the request', async () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    userEvent.click(screen.getByRole('tab', { name: 'check-circle Verify users 2' }));

    expect(screen.getAllByRole('img', { name: 'check' })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(screen.getByText('verifyTest1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('verifyTest2', { exact: false })).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('img', { name: 'check' })[0]);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'check' })).toHaveLength(1);
      expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(1);
      expect(screen.queryByText('verifyTest1', { exact: false })).not.toBeInTheDocument();
      expect(screen.getByText('verifyTest2', { exact: false })).toBeInTheDocument();
      expect(acceptVerify).toHaveBeenCalledTimes(1);
      expect(deleteRequest).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tab', { name: 'check-circle Verify users 1' })).toBeInTheDocument();
      expect(
        screen.queryByRole('tab', { name: 'check-circle Verify users 2' })
      ).not.toBeInTheDocument();
    });
  });

  it('clicking the X for a verify request rejects the request', async () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    userEvent.click(screen.getByRole('tab', { name: 'check-circle Verify users 2' }));

    expect(screen.getAllByRole('img', { name: 'check' })).toHaveLength(2);
    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(screen.getByText('verifyTest1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('verifyTest2', { exact: false })).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('img', { name: 'close' })[0]);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'check' })).toHaveLength(1);
      expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(1);
      expect(screen.queryByText('verifyTest1', { exact: false })).not.toBeInTheDocument();
      expect(screen.getByText('verifyTest2', { exact: false })).toBeInTheDocument();
      expect(acceptVerify).toHaveBeenCalledTimes(0);
      expect(deleteRequest).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tab', { name: 'check-circle Verify users 1' })).toBeInTheDocument();
      expect(
        screen.queryByRole('tab', { name: 'check-circle Verify users 2' })
      ).not.toBeInTheDocument();
    });
  });
});

describe('renders ban/delete forms', () => {
  it('renders ban/delete form when user clicks on Ban/Delete tab', () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    expect(
      screen.getByRole('tab', { name: 'stop Ban/Delete users', selected: false })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: true })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: 'stop Ban/Delete users' }));

    expect(
      screen.getByRole('tab', { name: 'stop Ban/Delete users', selected: true })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: false })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('textbox', { name: 'email' })).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'ban' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument();
  });
});

describe('bug reports', () => {
  it('renders bug reports when user clicks on Bug reports tab', () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    expect(
      screen.getByRole('tab', { name: 'bug Bug reports 2', selected: false })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: true })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: 'bug Bug reports 2' }));

    expect(
      screen.getByRole('tab', { name: 'bug Bug reports 2', selected: true })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: false })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(screen.getByText('bugTest1', { exact: false })).toBeInTheDocument();
  });

  it('clicking the X for a bug report deletes the request', async () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    userEvent.click(screen.getByRole('tab', { name: 'bug Bug reports 2' }));

    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(screen.getByText('bugTest1', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('bugTest2', { exact: false })).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('img', { name: 'close' })[0]);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(1);
      expect(screen.queryByText('bugTest1', { exact: false })).not.toBeInTheDocument();
      expect(screen.getByText('bugTest2', { exact: false })).toBeInTheDocument();
      expect(deleteRequest).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tab', { name: 'bug Bug reports 1' })).toBeInTheDocument();
      expect(screen.queryByRole('tab', { name: 'bug Bug reports 22' })).not.toBeInTheDocument();
    });
  });
});

describe('user reports', () => {
  it('renders user reports when user clicks on User reports tab', () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    expect(
      screen.getByRole('tab', { name: 'dislike User reports 2', selected: false })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: true })
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('tab', { name: 'dislike User reports 2' }));

    expect(
      screen.getByRole('tab', { name: 'dislike User reports 2', selected: true })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('tab', { name: 'bar-chart Statistics', selected: false })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);
    expect(
      screen.getAllByRole('heading', { name: 'Reported User: Not found Reported by: Not found' })
    ).toHaveLength(2);
  });

  it('clicking the X for a user report deletes the request', async () => {
    const user = admin1;
    useSession.mockReturnValue([{ user }, false]);
    render(AdminDash);

    userEvent.click(screen.getByRole('tab', { name: 'dislike User reports 2' }));

    expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(2);

    userEvent.click(screen.getAllByRole('img', { name: 'close' })[0]);

    await waitFor(() => {
      expect(screen.getAllByRole('img', { name: 'close' })).toHaveLength(1);
      expect(
        screen.getAllByRole('heading', { name: 'Reported User: Not found Reported by: Not found' })
      ).toHaveLength(1);
      expect(deleteRequest).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('tab', { name: 'dislike User reports 1' })).toBeInTheDocument();
      expect(screen.queryByRole('tab', { name: 'dislike User reports 2' })).not.toBeInTheDocument();
    });
  });
});
