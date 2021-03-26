/* eslint-disable import/order */
/* eslint-disable import/first */

// 'yarn test'

// https://testing-library.com/docs/react-testing-library/intro/

// import these in your test file
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ======================================================================

// import the component you want to test
// import Component from './Component'

// ======================================================================

// mock user session if you need to
// you can set the user's values here
const user = { _id: '1', fName: 'user', lName: 'test' };

jest.mock('next-auth/client', () => ({
  useSession: () => [{ user }, false],
}));

// ======================================================================

// mock backend related imports, for example
import { createPost } from '../actions/post';
// if you're using jest.fn() to mock the function, you will need to import that function

jest.mock('../actions/post', () => ({
  getFeedPosts: () => 'return anything', // returns same value whenever a component calls this function for ALL test cases
  createPost: jest.fn(), // mocks function so you can specify what to return in each SPECIFIC test case
  // write createPost.mockReturnedValue(valueToReturn) in a test case
}));

// ======================================================================

// example component
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

const Component = ({ props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* aria-label is needed to refer to components in test cases */}
      {/* the mocked createPost will be called instead of backend one when form is submitted */}
      <Form onFinish={createPost}>
        <Form.Item name="age" label="What is your age?">
          <Input aria-label="age" />
        </Form.Item>

        <Button aria-label="post" htmlType="submit" onClick={() => setVisible(true)}>
          Post
        </Button>
      </Form>

      {visible && <div>Hello World!</div>}
    </>
  );
};

it('renders the component', () => {
  render(<Component props />);
  // { name: 'post' } refers to the aria-label mentioned above
  // sometimes you might also need to specify the role
  // e.g. <div role="dialog" aria-label="something"></div>
  // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques
  // getByRole() is the most preferred way to refer to something
  expect(screen.getByRole('button', { name: 'post' })).toBeInTheDocument();

  // you can assign components to variables
  const ageField = expect(screen.getByRole('textbox', { name: 'age' })).toBeInTheDocument();

  // refer by label
  expect(screen.getByLabelText('What is your age?')).toBeInTheDocument();
  // https://testing-library.com/docs/queries/about
  // for other ways to refer to a component

  // expect(component).toBeInTheDocument();
  // expect(component).toHaveLength();
  // expect(component).toHaveValue();
  // https://jestjs.io/docs/expect
});

it('submits the form', async () => {
  // mock functions before rendering the component
  createPost.mockReturnValue({ _id: '1', author: 'user' });
  // or you can do this if you want to return different things each time
  createPost.mockReturnValueOnce({ _id: '1', author: 'user 1' });
  createPost.mockReturnValueOnce({ _id: '2', author: 'user 1' });

  render(<Component />);

  // making sure that 'Hello World!' is not initially displayed
  // notice the use of 'queryBy...' instead of 'getBy...'
  // https://testing-library.com/docs/guide-disappearance
  expect(screen.queryByText('Hello World!')).not.toBeInTheDocument();

  // user events
  // https://github.com/testing-library/user-event

  // type something
  userEvent.type(screen.getByRole('textbox', { name: 'age' }), '10');
  expect(screen.getByRole('textbox', { name: 'age' })).toHaveValue('10');

  // this does not work!
  const ageField = expect(screen.getByRole('textbox', { name: 'age' })).toBeInTheDocument();
  userEvent.type(ageField, '10');
  // expect(ageField).toHaveValue('10'); // test fails if this is uncommented
  // I think it's because it is referring to the old ageField and not the re-rendered one

  // click the button to submit
  userEvent.click(screen.getByRole('button', { name: 'post' }));

  // https://testing-library.com/docs/guide-disappearance
  // use 'waitFor()' to wait for the appearance of a component
  await waitFor(() => expect(screen.getByText('Hello World!')).toBeInTheDocument());

  // you can make sure that a mock has been called
  // again make sure to use waitFor() and make test case async
  await waitFor(() => expect(createPost).toHaveBeenCalledTimes(1));
});

// things you might not know
// you can use it.only('test case') to only run that single test case
// you can run "yarn test Component.test.jsx" to only run that test file

/*
  things to test
    - forms
      - it('renders fields')
      - it('calls mock function on submit with valid data')
      - it('does not call mock function on submit with invalid data')
    - lists
      - create fake data
      - it('renders items')
    - adding/deleting stuff
      - it('removes component') appears disappears
    - other tests idk
*/
