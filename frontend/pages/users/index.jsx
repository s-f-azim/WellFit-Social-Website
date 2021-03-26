import { Row, Col, Pagination, Button } from 'antd';
import Router from 'next/router';
import api from '../../services/api';

const Users = ({ users, total }) => (
  <>
    <Row
      type="flex"
      align="middle"
      justify="center"
      style={{ margin: '5rem', minHeight: '65vh', padding: '2rem' }}
      gutter={[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]}
    >
      {users.map((user) => (
        <Col key={user._id}>
          <div
            style={{ borderWidth: '1px', borderColor: 'black', border: 'solid', padding: '1rem' }}
          >
            <p>User id: {user._id}</p>
            <p>
              Name: {user.fName} {user.lName}
            </p>
            <p>Email: {user.email}</p>
            <Button type="primary" href={`/users/${user._id}`} key={user._id}>
              {' '}
              Go to user profile{' '}
            </Button>
          </div>
        </Col>
      ))}
    </Row>
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ marginTop: '2rem', minHeight: '15vh' }}
    >
      <Pagination
        defaultCurrent={1}
        total={{ total } / 20 > 0 ? total / 20 : 20}
        pageSize={2}
        onChange={(page) => Router.push(`/users/pages/${page}`)}
      />
    </Row>
  </>
);

// check if a page were given and prerender the page
export async function getStaticProps({ params }) {
  const currentPage = params ? params.page : undefined;
  const currentPageNumber = currentPage || 1;
  const response = await api.get(`/users?page=${currentPageNumber}`);
  return {
    props: { users: response.data.data, total: response.data.pagination.total },
    revalidate: 60 * 2,
  };
}

export default Users;
